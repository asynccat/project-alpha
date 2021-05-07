from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.utils import timezone
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from web.models import UserSettings
from web.utils.nickname_generator import generate_unique_nickname

from .permissions import IsOwner, NicknameUpdateAllowed
from .serializers import (
    UserSerializer,
    UserProfileSerializer,
    UserPreferencesSerializer,
    UpdateNicknameSerializer,
)


User = get_user_model()


class UserCreateAPIView(generics.CreateAPIView):
    """
    Create and save an instance of the User model.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny, )

    def perform_create(self, serializer):
        nickname = generate_unique_nickname(User)
        hashed_password = make_password(serializer.validated_data.get('password'))

        user = serializer.save()
        user.nickname = nickname
        user.password = hashed_password
        user.save()

        user_settings = UserSettings(user=user, nickname_updated=None)
        user_settings.save()


class UpdateNicknameAPIView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UpdateNicknameSerializer
    lookup_field = 'nickname'
    lookup_url_kwarg = 'nickname'
    permission_classes = (IsOwner, NicknameUpdateAllowed)

    def perform_update(self, serializer):
        user = self.get_object()
        UserSettings.objects.filter(user=user).update(nickname_updated=timezone.now())
        serializer.save()


class UserProfileAPIView(generics.RetrieveAPIView):
    """
    Retrieve user profile data.
    """
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    lookup_field = 'nickname'
    permission_classes = (AllowAny,)

    def get(self, request, nickname):
        user = self.get_object()
        user_data = {
            'nickname': user.nickname,
            'avatar': '/path/to/avatar.png',
        }
        if user.usersettings.show_email:
            user_data['email'] = user.email,
        return Response(user_data)


class UserPreferencesAPIView(APIView):
    """
    Retrieve user preferences.
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = UserPreferencesSerializer

    def get(self, request):
        user = request.user
        user_data = {
            'nickname': user.nickname,
            'email': user.email,
            'avatar': '/path/to/avatar.png',
            'show_email': user.usersettings.show_email,
        }
        return Response(user_data)
