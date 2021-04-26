from django.contrib.auth import get_user_model
from rest_framework import serializers

from .utils import get_tokens_for_user
from web.models import UserSettings

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
        model = User
        fields = ('email', 'nickname', 'avatar')


class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSettings
        fields = ('nickname_updated',)


class UpdateNicknameSerializer(serializers.ModelSerializer):
    nickname_updated = UserSettingsSerializer(required=False)

    class Meta:
        model = User
        fields = ('nickname', 'nickname_updated')
