"""Enregistrement des modèles dans l'admin Django (back-office /admin/)."""

from django.contrib import admin

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


@admin.register(Action)
class ActionAdmin(admin.ModelAdmin):
    list_display = ('title', 'badge', 'display_order', 'is_active', 'updated_at')
    list_editable = ('display_order', 'is_active')
    search_fields = ('title', 'description')


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'status', 'published_at', 'updated_at')
    list_filter = ('status', 'category')
    search_fields = ('title', 'excerpt', 'content')
    date_hierarchy = 'published_at'


@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display = ('stat_label', 'stat_value', 'suffix', 'display_order', 'is_active')
    list_editable = ('stat_value', 'suffix', 'display_order', 'is_active')


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'status', 'created_at')
    list_filter = ('status',)
    search_fields = ('name', 'email', 'subject')


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ('email', 'amount', 'type', 'status', 'created_at')
    list_filter = ('status', 'type')
    search_fields = ('email', 'firstname', 'lastname')


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'membership_type', 'status', 'created_at')
    list_filter = ('status', 'membership_type')
    search_fields = ('name', 'email')


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ('organization', 'email', 'partnership_type', 'status', 'created_at')
    list_filter = ('status', 'partnership_type')
    search_fields = ('organization', 'email')


@admin.register(Volunteer)
class VolunteerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'expertise', 'status', 'created_at')
    list_filter = ('status', 'expertise')
    search_fields = ('name', 'email')


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'status', 'subscribed_at')
    list_filter = ('status',)
    search_fields = ('email',)
