"""
Configuration des URLs du projet TESSIPI Foundation.
- /admin/ : back-office Django
- /api/   : endpoints de l'API (cf. api/urls.py)
- /media/ : fichiers téléversés (servis par Django en développement)
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]

# En développement, Django sert lui-même les fichiers média téléversés.
# En production, ils doivent être servis par le serveur web (Apache/Nginx).
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
