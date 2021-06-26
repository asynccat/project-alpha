from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.password_validation import get_password_validators, validate_password
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist

from project_alpha.web.utils.nickname_generator import generate_unique_nickname


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, email, password=None, nickname=None, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if nickname is None:
            nickname = generate_unique_nickname(self.model)
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, nickname=nickname, **extra_fields)
        if password:
            user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        nickname = generate_unique_nickname(self.model)
        return self.create_user(email, password, nickname=nickname, **extra_fields)


class User(AbstractUser):
    """
    Custom user model.
    """
    username = None
    email = models.EmailField(_('email address'), unique=True)
    nickname = models.CharField(_('nickname'), max_length=25, unique=True, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        try:
            if self.usersettings:
                pass
        except ObjectDoesNotExist:
            usersettings = UserSettings(user=self)
            usersettings.save()

    def validate(self, raw_password):
        validators = get_password_validators(validator_config=settings.AUTH_PASSWORD_VALIDATORS)
        errors_count = []
        for validator in validators:
            try:
                validator.validate(raw_password)
            except ValidationError as error:
                errors_count.append(error)
        return len(errors_count) <= settings.PASSWORD_VALIDATORS_COUNT_ALLOW

    def set_password(self, raw_password):
        if self.validate(raw_password):
            self.password = make_password(raw_password)
            self._password = raw_password
        else:
            validate_password(raw_password, user=User)

    def __str__(self):
        return self.email

    class Meta:
        app_label = 'web'


class UserSettings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, )
    avatar = models.ImageField(_('avatar'), upload_to='user_profile_image', blank=True, null=True)
    nickname_updated = models.DateTimeField(_('nickname_updated'), blank=True, null=True)
    show_email = models.BooleanField(_('show_email'), default=False)
    send_emails_with_news = models.BooleanField(_('send_emails_with_news'), default=False)
    timezone = models.CharField(_('timezone'),max_length=50, default='UTC')
    about_user = models.CharField(_('about_user'),max_length=500, default='', blank=True)
    send_updates_threads = models.BooleanField(_('send_updates_threads'), default=False)
    send_user_reviews = models.BooleanField(_('send_user_reviews'), default=False)
    send_user_quests_reviews = models.BooleanField(_('send_user_quests_reviews'), default=False)
    send_updates_messages = models.BooleanField(_('send_updates_messages'), default=False)
