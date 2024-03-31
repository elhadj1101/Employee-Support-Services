from rest_framework import permissions

class IsTreasurer(permissions.BasePermission):
    def has_permission(self, request, view):
        perm = (request.user.role == 'tresorier') and (request.user.is_authenticated)
        return perm