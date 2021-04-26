from django.conf import settings
from django.utils import timezone
from rest_framework.permissions import BasePermission


class IsOwner(BasePermission):
    """
    Objects can only be changed by their owners.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return request.user == obj


class NicknameUpdateAllowed(BasePermission):
    def has_object_permission(self, request, view, obj):
        nickname_updated = obj.usersettings.nickname_updated
        if nickname_updated:
            today = timezone.now()
            last_nickname_update = today - nickname_updated
            return last_nickname_update.days >= settings.NICKNAME_UPDATE_TIMEOUT_DAYS
        return True
