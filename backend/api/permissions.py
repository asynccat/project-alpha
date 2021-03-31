from rest_framework.permissions import BasePermission


class IsOwner(BasePermission):
    """
    Objects can only be changed by their owners.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return request.user == obj.author