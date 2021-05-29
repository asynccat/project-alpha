from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.utils import timezone

from rest_framework.request import Request
from rest_framework.renderers import JSONRenderer
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from project_alpha.web.models import UserSettings
from project_alpha.web.utils.nickname_generator import generate_unique_nickname

from .permissions import IsOwner, NicknameUpdateAllowed
from .serializers import (
    UserSerializer,
    UserProfileSerializer,
    UserPreferencesSerializer,
    UpdateNicknameSerializer,
    ChangeUserPasswordSerializer,
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
    # TODO: APIView does not have serializer_class
    # Probably need to use Generic views here
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


class ChangeUserPassword(APIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (JSONRenderer,)

    def error_response(self, msg: str, details: str = None) -> dict:
        response = {'error': msg, 'status': 'error'}
        if details:
            response['details'] = details
        return response

    def post(self, request: Request) -> Response:
        data = dict(request.data)
        serializer = ChangeUserPasswordSerializer(data=data)

        if not serializer.is_valid():
            return Response(
                self.error_response(
                    'Required fields are missing or empty.',
                    details=str(serializer.errors)
                ),
                status=status.HTTP_400_BAD_REQUEST,
                content_type='application/json'
            )

        user = request.user
        old_password = request.data.get('old_password')
        if not user.check_password(old_password):
            return Response(self.error_response('Password is incorrect'), status=status.HTTP_400_BAD_REQUEST)

        new_pwd = request.data.get('new_password')
        confirm_new_pwd = request.data.get('confirm_password')

        if new_pwd != confirm_new_pwd:
            return Response(self.error_response('New passwords does not match'), status.HTTP_400_BAD_REQUEST)

        user.set_password(new_pwd)
        user.save()
        return Response({'status': 'success'}, status=status.HTTP_200_OK)
