from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

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
