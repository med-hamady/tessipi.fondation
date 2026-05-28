"""
Vues de l'API TESSIPI Foundation.

Le format de réponse reproduit celui de l'ancien backend PHP afin de rester
compatible avec le frontend :
  - succès POST : {success: true, message: "...", id: N}
  - erreurs de validation : 400 {success: false, errors: ["...", ...]}
  - conflit (doublon) : 409 {success: false, message: "..."}
  - liste news : {success: true, data: [...], pagination: {...}}
"""

import math
import os
import uuid

from django.contrib.auth import authenticate
from django.core.files.storage import default_storage
from django.utils.text import get_valid_filename
from rest_framework import status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from .emails import send_submission_notification
from .models import Action, News, Stat
from .serializers import (
    ActionAdminSerializer,
    ActionPublicSerializer,
    AdminLoginSerializer,
    ContactSerializer,
    DonationSerializer,
    MemberSerializer,
    NewsAdminSerializer,
    NewsSerializer,
    NewsletterSerializer,
    PartnerSerializer,
    StatAdminSerializer,
    StatPublicSerializer,
    VolunteerSerializer,
)


def flatten_errors(errors):
    """Transforme le dict d'erreurs DRF en liste plate de messages (façon PHP)."""
    messages = []
    if isinstance(errors, dict):
        for value in errors.values():
            messages.extend(flatten_errors(value))
    elif isinstance(errors, list):
        for item in errors:
            messages.extend(flatten_errors(item))
    else:
        messages.append(str(errors))
    return messages


def is_conflict(exc):
    """Renvoie le message si l'erreur porte le code 'conflict' (doublon email), sinon None."""
    detail = exc.detail
    if isinstance(detail, dict):
        for value in detail.values():
            items = value if isinstance(value, list) else [value]
            for item in items:
                if getattr(item, 'code', None) == 'conflict':
                    return str(item)
    return None


class BaseSubmitView(APIView):
    """Vue générique pour les formulaires (POST -> création + message de succès)."""

    serializer_class = None
    success_message = 'Enregistré avec succès.'
    notification_subject = None

    def build_success(self, instance, serializer):
        return {'success': True, 'message': self.success_message, 'id': instance.id}

    def get_notification_fields(self, instance):
        """Liste de tuples (libellé, valeur) pour le corps de l'email. À surcharger."""
        return []

    def send_notification(self, instance):
        if not self.notification_subject:
            return
        send_submission_notification(
            subject=self.notification_subject,
            fields=self.get_notification_fields(instance),
            reply_to=getattr(instance, 'email', None),
        )

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as exc:
            conflict_message = is_conflict(exc)
            if conflict_message:
                return Response(
                    {'success': False, 'message': conflict_message},
                    status=status.HTTP_409_CONFLICT,
                )
            return Response(
                {'success': False, 'errors': flatten_errors(exc.detail)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        instance = serializer.save()
        self.send_notification(instance)
        return Response(self.build_success(instance, serializer), status=status.HTTP_201_CREATED)


class ContactView(BaseSubmitView):
    serializer_class = ContactSerializer
    success_message = (
        'Votre message a été envoyé avec succès. '
        'Nous vous répondrons dans les plus brefs délais.'
    )
    notification_subject = 'Nouveau message de contact — TESSIPI'

    def get_notification_fields(self, instance):
        return [
            ('Nom', instance.name),
            ('Email', instance.email),
            ('Sujet', instance.subject),
            ('Message', instance.message),
        ]


class NewsletterView(BaseSubmitView):
    serializer_class = NewsletterSerializer
    success_message = 'Vous êtes maintenant inscrit à notre newsletter !'
    notification_subject = 'Nouvelle inscription à la newsletter — TESSIPI'

    def get_notification_fields(self, instance):
        return [('Email', instance.email)]


class DonationView(BaseSubmitView):
    serializer_class = DonationSerializer
    notification_subject = 'Nouveau don — TESSIPI'

    def get_notification_fields(self, instance):
        return [
            ('Montant', f'{instance.amount} €'),
            ('Type', instance.get_type_display()),
            ('Prénom', instance.firstname),
            ('Nom', instance.lastname),
            ('Email', instance.email),
            ('Message', instance.message),
        ]

    def build_success(self, instance, serializer):
        # Ici s'intégrerait la passerelle de paiement (Stripe, PayPal, etc.)
        return {
            'success': True,
            'message': 'Don enregistré. Redirection vers la page de paiement...',
            'donation_id': instance.id,
            'amount': str(instance.amount),
            'type': instance.type,
        }


class PartnerView(BaseSubmitView):
    serializer_class = PartnerSerializer
    success_message = (
        'Votre demande de partenariat a été envoyée. '
        'Nous vous contacterons prochainement.'
    )
    notification_subject = 'Nouvelle demande de partenariat — TESSIPI'

    def get_notification_fields(self, instance):
        return [
            ('Organisation', instance.organization),
            ('Email', instance.email),
            ('Téléphone', instance.phone),
            ('Type de partenariat', instance.get_partnership_type_display()),
            ('Message', instance.message),
        ]


class VolunteerView(BaseSubmitView):
    serializer_class = VolunteerSerializer
    success_message = (
        'Votre inscription en tant que bénévole a été enregistrée. '
        'Nous vous contacterons prochainement.'
    )
    notification_subject = 'Nouvelle candidature de bénévole — TESSIPI'

    def get_notification_fields(self, instance):
        return [
            ('Nom', instance.name),
            ('Email', instance.email),
            ('Téléphone', instance.phone),
            ('Expertise', instance.get_expertise_display()),
            ('Expérience', instance.experience),
            ('Disponibilité', instance.availability),
            ('Message', instance.message),
        ]


class MemberView(BaseSubmitView):
    serializer_class = MemberSerializer
    success_message = (
        "Votre demande d'adhésion a été enregistrée. "
        'Bienvenue dans la communauté TESSIPI !'
    )
    notification_subject = "Nouvelle demande d'adhésion — TESSIPI"

    def get_notification_fields(self, instance):
        return [
            ('Nom', instance.name),
            ('Email', instance.email),
            ('Téléphone', instance.phone),
            ("Type d'adhésion", instance.get_membership_type_display()),
            ('Adresse', instance.address),
            ('Ville', instance.city),
            ('Code postal', instance.postal_code),
            ('Motivation', instance.motivation),
        ]


class NewsListView(APIView):
    """GET : liste paginée des actualités publiées, avec filtre par catégorie."""

    def get(self, request):
        try:
            page = max(int(request.query_params.get('page', 1)), 1)
        except (TypeError, ValueError):
            page = 1
        try:
            limit = max(int(request.query_params.get('limit', 10)), 1)
        except (TypeError, ValueError):
            limit = 10

        category = request.query_params.get('category')

        queryset = News.objects.filter(status=News.Status.PUBLISHED)
        if category:
            queryset = queryset.filter(category=category)

        total = queryset.count()
        offset = (page - 1) * limit
        articles = queryset[offset:offset + limit]

        lang = request.query_params.get('lang', 'fr')
        return Response({
            'success': True,
            'data': NewsSerializer(articles, many=True, context={'lang': lang}).data,
            'pagination': {
                'page': page,
                'limit': limit,
                'total': total,
                'pages': math.ceil(total / limit) if limit else 0,
            },
        })


class ActionsListView(APIView):
    """GET : liste publique des programmes actifs (section « Nos actions »)."""

    def get(self, request):
        actions = Action.objects.filter(is_active=True)
        lang = request.query_params.get('lang', 'fr')
        return Response({
            'success': True,
            'data': ActionPublicSerializer(actions, many=True, context={'lang': lang}).data,
        })


class StatsListView(APIView):
    """GET : liste publique des chiffres clés actifs (section « Notre impact »)."""

    def get(self, request):
        stats = Stat.objects.filter(is_active=True)
        lang = request.query_params.get('lang', 'fr')
        return Response({
            'success': True,
            'data': StatPublicSerializer(stats, many=True, context={'lang': lang}).data,
        })


# ---------------------------------------------------------------------------
# Administration : authentification par token + CRUD protégé (IsAdminUser)
# ---------------------------------------------------------------------------

class AdminLoginView(APIView):
    """POST : authentifie un membre du staff et renvoie un token DRF."""

    def post(self, request):
        serializer = AdminLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            request,
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password'],
        )
        if user is None:
            return Response(
                {'success': False, 'message': 'Identifiants invalides.'},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        if not user.is_staff:
            return Response(
                {'success': False, 'message': "Ce compte n'a pas accès à l'administration."},
                status=status.HTTP_403_FORBIDDEN,
            )
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'success': True,
            'token': token.key,
            'user': {'username': user.username, 'is_superuser': user.is_superuser},
        })


class AdminMeView(APIView):
    """GET : renvoie l'utilisateur courant (validation du token au chargement)."""

    permission_classes = [IsAdminUser]

    def get(self, request):
        user = request.user
        return Response({
            'success': True,
            'user': {'username': user.username, 'is_superuser': user.is_superuser},
        })

    def post(self, request):
        """Déconnexion : supprime le token courant."""
        Token.objects.filter(user=request.user).delete()
        return Response({'success': True})


class AdminUploadView(APIView):
    """POST (multipart) : téléverse une image et renvoie son URL absolue."""

    permission_classes = [IsAdminUser]
    parser_classes = [MultiPartParser, FormParser]

    ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'}
    MAX_SIZE = 5 * 1024 * 1024  # 5 Mo

    def post(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response(
                {'success': False, 'message': 'Aucun fichier reçu (champ « file »).'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        ext = os.path.splitext(file.name)[1].lower()
        if ext not in self.ALLOWED_EXTENSIONS:
            return Response(
                {'success': False, 'message': f'Type de fichier non autorisé ({ext}).'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if file.size > self.MAX_SIZE:
            return Response(
                {'success': False, 'message': 'Fichier trop volumineux (max 5 Mo).'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Nom unique et sûr pour éviter collisions et caractères problématiques.
        base = get_valid_filename(os.path.splitext(file.name)[0])[:40] or 'image'
        filename = f'uploads/{base}-{uuid.uuid4().hex[:8]}{ext}'
        saved_path = default_storage.save(filename, file)
        url = request.build_absolute_uri(default_storage.url(saved_path))

        return Response({'success': True, 'url': url}, status=status.HTTP_201_CREATED)


class AdminActionViewSet(viewsets.ModelViewSet):
    """CRUD admin des programmes (« Nos actions »)."""

    queryset = Action.objects.all()
    serializer_class = ActionAdminSerializer
    permission_classes = [IsAdminUser]


class AdminNewsViewSet(viewsets.ModelViewSet):
    """CRUD admin des actualités."""

    queryset = News.objects.all().order_by('-published_at', '-created_at')
    serializer_class = NewsAdminSerializer
    permission_classes = [IsAdminUser]


class AdminStatViewSet(viewsets.ModelViewSet):
    """CRUD admin des chiffres clés (« Notre impact »)."""

    queryset = Stat.objects.all()
    serializer_class = StatAdminSerializer
    permission_classes = [IsAdminUser]
