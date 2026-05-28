"""
Serializers DRF — validation des entrées et sérialisation des sorties.
Les règles de validation reprennent celles de l'ancien backend PHP.
"""

from decimal import Decimal

from rest_framework import serializers

from .models import (
    Action,
    Contact,
    Donation,
    Member,
    News,
    NewsletterSubscriber,
    Partner,
    Stat,
    Volunteer,
)

# Mois par langue pour formater les dates des actualités.
MONTHS = {
    'fr': ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    'en': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    'ar': ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
           'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
}

SUPPORTED_LANGS = ('fr', 'en', 'ar')


def format_date(value, lang='fr'):
    """Formate une date selon la langue (ex. FR « 10 Fév 2026 », EN « Feb 10, 2026 »)."""
    if not value:
        return ''
    months = MONTHS.get(lang, MONTHS['fr'])
    month = months[value.month - 1]
    if lang == 'en':
        return f'{month} {value.day}, {value.year}'
    return f'{value.day} {month} {value.year}'


# Conserve l'ancien nom pour compatibilité.
def format_fr_date(value):
    return format_date(value, 'fr')


class LocalizedSerializerMixin:
    """Résout les champs traduisibles selon la langue passée dans le contexte
    (``context['lang']``), avec repli sur la version française (champ de base)
    si la traduction est vide. Les sous-classes définissent ``localized_fields``,
    un mapping {champ_de_sortie: nom_de_base_du_modèle}."""

    localized_fields = {}

    def get_lang(self):
        lang = self.context.get('lang', 'fr')
        return lang if lang in SUPPORTED_LANGS else 'fr'

    def localized(self, obj, base):
        lang = self.get_lang()
        if lang != 'fr':
            translated = getattr(obj, f'{base}_{lang}', '') or ''
            if translated.strip():
                return translated
        return getattr(obj, base) or ''


class ContactSerializer(serializers.ModelSerializer):
    name = serializers.CharField(min_length=2, max_length=100, trim_whitespace=True)
    subject = serializers.CharField(min_length=3, max_length=200, trim_whitespace=True)
    message = serializers.CharField(min_length=10, trim_whitespace=True)

    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'subject', 'message']
        read_only_fields = ['id']


class NewsletterSerializer(serializers.ModelSerializer):
    # Champ déclaré sans UniqueValidator auto, pour gérer nous-mêmes le 409
    email = serializers.EmailField(max_length=100, validators=[])

    class Meta:
        model = NewsletterSubscriber
        fields = ['id', 'email']
        read_only_fields = ['id']

    def validate_email(self, value):
        if NewsletterSubscriber.objects.filter(email__iexact=value).exists():
            # code 'conflict' -> traduit en HTTP 409 dans la vue
            raise serializers.ValidationError('Cet email est déjà inscrit à la newsletter', code='conflict')
        return value


class DonationSerializer(serializers.ModelSerializer):
    amount = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('1'))
    firstname = serializers.CharField(min_length=2, max_length=50, trim_whitespace=True)
    lastname = serializers.CharField(min_length=2, max_length=50, trim_whitespace=True)

    class Meta:
        model = Donation
        fields = [
            'id', 'amount', 'type', 'email', 'firstname', 'lastname',
            'address', 'city', 'postal_code', 'country', 'message',
        ]
        read_only_fields = ['id']


class PartnerSerializer(serializers.ModelSerializer):
    organization = serializers.CharField(min_length=2, max_length=100, trim_whitespace=True)

    class Meta:
        model = Partner
        fields = ['id', 'organization', 'email', 'phone', 'partnership_type', 'message']
        read_only_fields = ['id']


class VolunteerSerializer(serializers.ModelSerializer):
    name = serializers.CharField(min_length=2, max_length=100, trim_whitespace=True)

    class Meta:
        model = Volunteer
        fields = [
            'id', 'name', 'email', 'phone', 'expertise',
            'experience', 'availability', 'message',
        ]
        read_only_fields = ['id']


class MemberSerializer(serializers.ModelSerializer):
    name = serializers.CharField(min_length=2, max_length=100, trim_whitespace=True)
    phone = serializers.CharField(max_length=20, trim_whitespace=True)
    # Champ déclaré sans UniqueValidator auto, pour gérer nous-mêmes le 409
    email = serializers.EmailField(max_length=100, validators=[])

    class Meta:
        model = Member
        fields = [
            'id', 'name', 'email', 'phone',
            'address', 'city', 'postal_code', 'motivation',
        ]
        read_only_fields = ['id']

    def validate_email(self, value):
        if Member.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError('Cet email est déjà associé à un compte membre', code='conflict')
        return value


class NewsSerializer(LocalizedSerializerMixin, serializers.ModelSerializer):
    """Lecture publique d'une actualité (section « Actualités »)."""

    # Libellé lisible de la catégorie (ex. "Nouveau projet") pour le badge
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    # Champs traduisibles résolus selon la langue (repli sur le français)
    title = serializers.SerializerMethodField()
    excerpt = serializers.SerializerMethodField()
    content = serializers.SerializerMethodField()
    # Date formatée selon la langue + alt d'image basé sur le titre
    date = serializers.SerializerMethodField()
    alt = serializers.SerializerMethodField()

    class Meta:
        model = News
        fields = [
            'id', 'title', 'excerpt', 'content', 'category', 'category_display',
            'image', 'alt', 'author', 'date', 'published_at', 'created_at',
        ]

    def get_title(self, obj):
        return self.localized(obj, 'title')

    def get_excerpt(self, obj):
        return self.localized(obj, 'excerpt')

    def get_content(self, obj):
        return self.localized(obj, 'content')

    def get_alt(self, obj):
        return self.localized(obj, 'title')

    def get_date(self, obj):
        return format_date(obj.published_at or obj.created_at, self.get_lang())


# ---------------------------------------------------------------------------
# Sections gérées par l'admin : Action, Stat (impact)
# ---------------------------------------------------------------------------

class ActionPublicSerializer(LocalizedSerializerMixin, serializers.ModelSerializer):
    """Lecture publique d'un programme (section « Nos actions »)."""

    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    alt = serializers.SerializerMethodField()
    badge = serializers.SerializerMethodField()

    class Meta:
        model = Action
        fields = ['id', 'image', 'alt', 'badge', 'title', 'description', 'display_order']

    def get_title(self, obj):
        return self.localized(obj, 'title')

    def get_description(self, obj):
        return self.localized(obj, 'description')

    def get_alt(self, obj):
        return self.localized(obj, 'alt')

    def get_badge(self, obj):
        return self.localized(obj, 'badge')


class StatPublicSerializer(LocalizedSerializerMixin, serializers.ModelSerializer):
    """Lecture publique d'un chiffre clé (section « Notre impact »)."""

    target = serializers.IntegerField(source='stat_value')
    label = serializers.SerializerMethodField()
    sublabel = serializers.SerializerMethodField()

    class Meta:
        model = Stat
        fields = ['id', 'icon', 'target', 'suffix', 'label', 'sublabel', 'display_order']

    def get_label(self, obj):
        return self.localized(obj, 'stat_label')

    def get_sublabel(self, obj):
        return self.localized(obj, 'description')


# ---------------------------------------------------------------------------
# Serializers d'administration (CRUD complet, champs bruts modifiables)
# ---------------------------------------------------------------------------

class ActionAdminSerializer(serializers.ModelSerializer):
    title = serializers.CharField(min_length=2, max_length=150, trim_whitespace=True)

    class Meta:
        model = Action
        fields = [
            'id', 'title', 'title_en', 'title_ar',
            'description', 'description_en', 'description_ar',
            'image', 'alt', 'alt_en', 'alt_ar',
            'badge', 'badge_en', 'badge_ar',
            'display_order', 'is_active', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class StatAdminSerializer(serializers.ModelSerializer):
    stat_label = serializers.CharField(min_length=1, max_length=100, trim_whitespace=True)

    class Meta:
        model = Stat
        fields = [
            'id', 'stat_key', 'stat_value',
            'stat_label', 'stat_label_en', 'stat_label_ar',
            'description', 'description_en', 'description_ar',
            'icon', 'suffix', 'display_order', 'is_active', 'updated_at',
        ]
        read_only_fields = ['id', 'updated_at']


class NewsAdminSerializer(serializers.ModelSerializer):
    title = serializers.CharField(min_length=2, max_length=200, trim_whitespace=True)
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = News
        fields = [
            'id', 'title', 'title_en', 'title_ar',
            'excerpt', 'excerpt_en', 'excerpt_ar',
            'content', 'content_en', 'content_ar',
            'category', 'category_display',
            'image', 'author', 'status', 'status_display',
            'published_at', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class AdminLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'}, trim_whitespace=False)
