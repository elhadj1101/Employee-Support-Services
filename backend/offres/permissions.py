from rest_framework import permissions
from backend.settings import CAN_PUBLISH_OFFRE

class CanPublishOffre(permissions.BasePermission):
    def has_permission(self, request, view):
        return (request.user and request.user.role in CAN_PUBLISH_OFFRE )
