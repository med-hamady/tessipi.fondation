"""Routes de l'API — équivalent des anciens fichiers backend/api/*.php."""

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

# Routeur DRF pour le CRUD d'administration (protégé par token + IsAdminUser)
admin_router = DefaultRouter()
admin_router.register('actions', views.AdminActionViewSet, basename='admin-actions')
admin_router.register('news', views.AdminNewsViewSet, basename='admin-news')
admin_router.register('stats', views.AdminStatViewSet, basename='admin-stats')

urlpatterns = [
    # Formulaires publics (POST)
    path('contact/', views.ContactView.as_view(), name='contact'),
    path('newsletter/', views.NewsletterView.as_view(), name='newsletter'),
    path('donation/', views.DonationView.as_view(), name='donation'),
    path('partners/', views.PartnerView.as_view(), name='partners'),
    path('volunteers/', views.VolunteerView.as_view(), name='volunteers'),
    path('members/', views.MemberView.as_view(), name='members'),

    # Contenus publics (GET) pilotés par l'admin
    path('news/', views.NewsListView.as_view(), name='news'),
    path('actions/', views.ActionsListView.as_view(), name='actions'),
    path('stats/', views.StatsListView.as_view(), name='stats'),

    # Administration
    path('admin/login/', views.AdminLoginView.as_view(), name='admin-login'),
    path('admin/me/', views.AdminMeView.as_view(), name='admin-me'),
    path('admin/upload/', views.AdminUploadView.as_view(), name='admin-upload'),
    path('admin/', include(admin_router.urls)),
]
