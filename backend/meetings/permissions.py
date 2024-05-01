from rest_framework import permissions


class IsCommitte(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role != "employe"


class CanCreateMeeting(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in ["POST", "PUT", "PATCH", "DELETE"]:
            return request.user.role in ["president", "vice_president"]
        return True
