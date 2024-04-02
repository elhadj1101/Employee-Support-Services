from rest_framework import permissions


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return (request.user and request.user.is_superuser)
class canViewDetails (permissions.BasePermission):
    def has_permission(self, request, view):
        return (request.user and ((request.user.role not in ['employe']) or (request.user and request.user.is_superuser))) if (request.method == "GET"  ) else (request.user and request.user.is_superuser)