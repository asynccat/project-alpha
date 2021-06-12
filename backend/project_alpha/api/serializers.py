from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _
from rest_framework.validators import UniqueValidator
from rest_framework import serializers

from project_alpha.web.models import UserSettings

from .utils import get_tokens_for_user
from .validators import NicknameValidator


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    nickname = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = ('email', 'password', 'token', 'nickname')
        read_only_fields = ('token', 'nickname')
        extra_kwargs = {'password': {'write_only': True}}

    def get_token(self, obj):
        return get_tokens_for_user(obj)


class UserProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=False)

    class Meta:
        model = User
        fields = ('email', 'nickname', 'avatar')


class UserPreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSettings
        fields = ('show_email', 'send_emails_with_news', 'timezone', 'about_user',
                  'send_updates_threads', 'send_user_reviews', 'send_user_quests_reviews', 'send_updates_messages')

class UpdateNicknameSerializer(serializers.ModelSerializer):
    nickname = serializers.CharField(
        validators=[
            UniqueValidator(User.objects.all(), message=_('Nickname already exists')),
            NicknameValidator(),
        ]
    )

    class Meta:
        model = User
        fields = ('nickname',)


class ChangeUserPasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, allow_blank=False, allow_null=False)
    new_password = serializers.CharField(required=True, allow_blank=False, allow_null=False)
    confirm_password = serializers.CharField(required=True, allow_blank=False, allow_null=False)
