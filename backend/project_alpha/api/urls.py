from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    UserCreateAPIView,
    UserProfileAPIView,
    UserPreferencesAPIView,
    UpdateNicknameAPIView,
    UploadUserAvatarAPIView,
    ChangeUserPassword,
    ChangeEmailAPIView,
)

v1_router = DefaultRouter()

urlpatterns = [
    path('v1/sign-up/', UserCreateAPIView.as_view(), name='sign_up'),
    path('v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('v1/user/<str:nickname>/nickname/update/', UpdateNicknameAPIView.as_view(), name='nickname_update'),
    path('v1/user/change_email/', ChangeEmailAPIView.as_view(), name='change_email'),
    path('v1/profile/<str:nickname>/', UserProfileAPIView.as_view(), name='user_profile'),
    path('v1/preferences/', UserPreferencesAPIView.as_view(), name='preferences'),
    path('v1/preferences/profile_image/', UploadUserAvatarAPIView.as_view(), name='profile_image'),
    path('v1/change_password/', ChangeUserPassword.as_view(), name='change_password'),
    path('v1/', include(v1_router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)