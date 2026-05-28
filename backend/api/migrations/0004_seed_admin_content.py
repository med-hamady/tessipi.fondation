"""
Seed des contenus gérés par l'admin :
- Programmes « Nos actions » (repris de l'ancien frontend content.js)
- Enrichissement des chiffres « Notre impact » (icône, suffixe, ordre, sous-label)
- Correction des chemins d'images des actualités vers les assets existants
"""

from django.db import migrations


ACTIONS = [
    {
        'image': '/images/asset_2.jpg',
        'alt': 'Santé & Bien-être',
        'badge': '147K+ bénéficiaires',
        'title': 'Santé & Bien-être',
        'description': (
            'Consultations médicales, vaccinations, campagnes de dépistage et mise en place '
            'de cliniques mobiles dans les zones reculées. Nous formons des agents de santé '
            'communautaires pour assurer un suivi continu.'
        ),
    },
    {
        'image': '/images/asset_3.jpg',
        'alt': 'Nutrition & Alimentation',
        'badge': '89 programmes actifs',
        'title': 'Nutrition & Alimentation',
        'description': (
            'Distribution de kits alimentaires, programmes de supplémentation nutritionnelle '
            'pour les enfants et les femmes enceintes, et éducation aux pratiques alimentaires saines.'
        ),
    },
    {
        'image': '/images/asset_4.jpg',
        'alt': 'Éducation & Développement',
        'badge': '45 écoles soutenues',
        'title': 'Éducation & Développement',
        'description': (
            "Construction d'écoles, formation des enseignants, distribution de fournitures "
            "scolaires et programmes d'alphabétisation pour adultes. L'éducation est la clé de l'autonomie."
        ),
    },
    {
        'image': '/images/asset_5.jpg',
        'alt': 'Protection & Inclusion',
        'badge': '12 centres de protection',
        'title': 'Protection & Inclusion',
        'description': (
            'Protection des populations vulnérables, défense des droits humains, accompagnement '
            "des réfugiés et des personnes déplacées. Création d'espaces sécurisés pour les femmes et les enfants."
        ),
    },
    {
        'image': '/images/asset_6.jpg',
        'alt': 'Eau, Hygiène & Assainissement',
        'badge': "234 points d'eau créés",
        'title': 'Eau, Hygiène & Assainissement',
        'description': (
            "Forage de puits, installation de pompes à eau, construction de latrines et "
            "sensibilisation aux pratiques d'hygiène. L'accès à l'eau potable est un droit fondamental."
        ),
    },
    {
        'image': '/images/asset_7.jpg',
        'alt': 'Urgence & Réhabilitation',
        'badge': '24/7 disponible',
        'title': 'Urgence & Réhabilitation',
        'description': (
            "Intervention rapide en cas de catastrophes naturelles ou de conflits, distribution "
            "d'aide d'urgence, et programmes de réhabilitation pour la reconstruction des communautés."
        ),
    },
]

# Enrichissement des stats existantes (clé -> attributs d'affichage)
STAT_DISPLAY = {
    'beneficiaries': {'icon': 'fa-users', 'suffix': '+', 'order': 1, 'sublabel': 'Personnes aidées'},
    'countries': {'icon': 'fa-globe', 'suffix': '', 'order': 2, 'sublabel': "Zones d'intervention"},
    'clinics': {'icon': 'fa-hospital', 'suffix': '', 'order': 3, 'sublabel': 'Centres de santé'},
    'year_founded': {'icon': 'fa-calendar-alt', 'suffix': '', 'order': 4, 'sublabel': "Années d'expérience"},
    'water_points': {'icon': 'fa-tint', 'suffix': '', 'order': 5, 'sublabel': 'Forages et pompes'},
    'schools': {'icon': 'fa-graduation-cap', 'suffix': '', 'order': 6, 'sublabel': 'Établissements soutenus'},
}

# Anciens chemins d'images des actualités -> assets réellement présents dans le frontend
NEWS_IMAGE_FIX = {
    "Inauguration d'une nouvelle clinique en Afrique de l'Est": '/images/asset_8.jpg',
    'Formation internationale des agents de santé communautaire': '/images/asset_9.jpg',
    'Comment un dépistage a sauvé une année scolaire': '/images/asset_10.jpg',
}


def seed(apps, schema_editor):
    Action = apps.get_model('api', 'Action')
    Stat = apps.get_model('api', 'Stat')
    News = apps.get_model('api', 'News')

    for order, item in enumerate(ACTIONS, start=1):
        Action.objects.get_or_create(
            title=item['title'],
            defaults={**item, 'display_order': order, 'is_active': True},
        )

    for key, disp in STAT_DISPLAY.items():
        Stat.objects.filter(stat_key=key).update(
            icon=disp['icon'],
            suffix=disp['suffix'],
            display_order=disp['order'],
            description=disp['sublabel'],
            is_active=True,
        )

    for title, image in NEWS_IMAGE_FIX.items():
        News.objects.filter(title=title).update(image=image)


def unseed(apps, schema_editor):
    Action = apps.get_model('api', 'Action')
    Action.objects.filter(title__in=[a['title'] for a in ACTIONS]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_action_alter_stat_options_stat_display_order_and_more'),
    ]

    operations = [
        migrations.RunPython(seed, unseed),
    ]
