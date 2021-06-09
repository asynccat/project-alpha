from django.contrib.auth import get_user_model
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.contrib.auth.backends import ModelBackend, UserModel
from django.contrib.auth.models import AbstractBaseUser

from rest_framework.request import Request
from rest_framework.renderers import JSONRenderer
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError as DRFValidationError

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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # changed here
        user = self.perform_create(serializer)

        headers = self.get_success_headers(user)
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        nickname = generate_unique_nickname(User)
        password = serializer.validated_data.get('password')
        user = User()
        user.email = serializer.validated_data.get('email')
        user.nickname = nickname
        try:
            user.set_password(password)
        except ValidationError as err:
            raise DRFValidationError(detail={'password': err.messages}) from err
        user.save()
        user_settings = UserSettings(user=user, nickname_updated=None)
        user_settings.save()
        return user


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

    def get(self, request, nickname):  # pylint: disable=unused-argument, arguments-differ
        user = self.get_object()
        user_data = {
            'nickname': user.nickname,
            'avatar': '/path/to/avatar.png',
        }
        if user.usersettings.show_email:
            user_data['email'] = user.email
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
            'send me emails with news from project alpha ': user.usersettings.send_me_emails_with_news_from_project_alpha,
            'timezone': user.usersettings.timezone,
            'about user': user.usersettings.about_user,
            'send email updates threads': user.usersettings.send_email_updates_threads,
            'send email updates user reviews': user.usersettings.send_email_updates_user_reviews,
            'send email updates user quests reviews': user.usersettings.send_email_updates_user_quests_reviews,
            'send email updates messages': user.usersettings.send_email_updates_messages,
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


class CustomModelBackend(ModelBackend):
    """
    Authenticates against settings.AUTH_USER_MODEL.
    """

    def authenticate(self, request, username=None, password=None, **kwargs):
        if username is None:
            username = kwargs.get(UserModel.USERNAME_FIELD)
        if username is None or password is None:
            return None
        try:
            user = UserModel.objects.get_by_natural_key(username)
        except UserModel.DoesNotExist:
            # changed here
            AbstractBaseUser().set_password(password)
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user
        return None
