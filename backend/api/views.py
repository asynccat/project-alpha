from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.web.utils.nickname_generator import generate_unique_nickname

from .serializers import (
    UserSerializer,
    UserProfileSerializer,
    UserPreferencesSerializer,
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
        raw_password = serializer.validated_data.get('password')
        hashed_password = make_password(raw_password)
        serializer.save(nickname=nickname, password=hashed_password)


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
