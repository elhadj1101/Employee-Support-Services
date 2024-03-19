from rest_framework import permissions
from backend.settings import CAN_PUBLISH_OFFRE

class CanPublishOffre(permissions.BasePermission):
    def has_permission(self, request, view):
        perm = (request.user and request.user.is_authenticated) if request.method == 'GET' else (request.user and request.user.role in CAN_PUBLISH_OFFRE )
        return perm
