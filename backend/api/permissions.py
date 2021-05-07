from django.conf import settings
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from rest_framework.permissions import BasePermission

from .utils import get_word_ending


class IsOwner(BasePermission):
    """
    Objects can only be changed by their owners.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return request.user == obj


class NicknameUpdateAllowed(BasePermission):
    message = _('You cannot change your nickname.')

    def has_object_permission(self, request, view, obj):
        nickname_updated = obj.usersettings.nickname_updated

        if nickname_updated:
            today = timezone.now()
            last_nickname_update = today - nickname_updated
            if last_nickname_update.days < settings.NICKNAME_UPDATE_TIMEOUT_DAYS:
                nickname_timeout = settings.NICKNAME_UPDATE_TIMEOUT_DAYS - last_nickname_update.days
                self.message = _(f'You can change your nickname in {get_word_ending(nickname_timeout)}')
            return last_nickname_update.days >= settings.NICKNAME_UPDATE_TIMEOUT_DAYS

        return True
