from rest_framework import permissions

class IsTreasurer(permissions.BasePermission):
    def has_permission(self, request, view):
        perm = (request.user.role == 'tresorier') and (request.user.is_authenticated)
        return perm
    
class CanViewCommity(permissions.BasePermission):
    def has_permission(self, request, view):
        perm = ((request.user) and (request.user.is_authenticated)) and (request.user.is_admin or (request.method == 'GET' and request.user.role == 'tresorier'))
        return perm