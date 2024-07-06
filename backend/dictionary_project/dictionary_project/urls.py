from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('api/schema/', SpectacularAPIView.as_view(), name='api_schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='api_schema'),
         name='api_docs'),
    path('admin/', admin.site.urls),
    path('api/', include('dictionary_app.urls')),
    path('', lambda request: HttpResponse("server started")),
]
