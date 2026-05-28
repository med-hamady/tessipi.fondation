"""Envoi des notifications email des formulaires publics vers l'adresse de la fondation."""

from django.conf import settings
from django.core.mail import EmailMessage


def send_submission_notification(subject, fields, reply_to=None):
    """Notifie l'adresse de contact de la fondation d'une nouvelle soumission.

    `fields` est une liste de tuples (libellé, valeur) ; les valeurs vides sont
    ignorées. L'envoi est silencieux (fail_silently) pour ne jamais faire échouer
    l'enregistrement du formulaire si la messagerie est indisponible.
    """
    recipient = getattr(settings, 'CONTACT_EMAIL', '')
    if not recipient:
        return

    body = '\n'.join(
        f'{label} : {value}' for label, value in fields if value not in (None, '')
    )
    email = EmailMessage(
        subject=subject,
        body=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[recipient],
        reply_to=[reply_to] if reply_to else None,
    )
    email.send(fail_silently=True)
