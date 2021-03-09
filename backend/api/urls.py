from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    UserCreateAPIView,
)

v1_router = DefaultRouter()

urlpatterns = [
    path('v1/sign-up/', UserCreateAPIView.as_view(), name='sign_up'),
    path('v1/', include('rest_framework_social_oauth2.urls')),
    path('v1/', include(v1_router.urls)),
]
