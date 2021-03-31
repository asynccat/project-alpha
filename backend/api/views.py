from datetime import datetime

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from web.models import UserSettings
from web.utils.nickname_generator import generate_unique_nickname

from .permissions import IsOwner
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
        nickname_updated = datetime.now()
        hashed_password = make_password(serializer.validated_data.get('password'))

        user = serializer.save()
        user.nickname = nickname
        user.password = hashed_password
        user.save()

        user_settings = UserSettings(user=user, nickname_updated=nickname_updated)
        user_settings.save()


class UpdateNicknameAPIView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UpdateNicknameSerializer
    lookup_field = 'nickname'
    lookup_url_kwarg = 'nickname'
    permission_classes = (IsOwner,)


class UserProfileAPIView(generics.RetrieveAPIView):
    """
    Retrieve user profile data.
    """
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    lookup_field = 'nickname'
    permission_classes = (AllowAny,)

    def get(self, request, nickname):
        user_data = {
            'nickname': nickname,
            'email': f'{nickname}@gmail.com',
            'avatar': '/path/to/avatar.png',
        }
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
            'nickname': user.email.split('@')[0],
            'email': user.email,
            'avatar': '/path/to/avatar.png',
        }
        return Response(user_data)
