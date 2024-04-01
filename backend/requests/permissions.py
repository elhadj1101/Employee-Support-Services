from rest_framework import permissions
from .models import Loan, Financial_aid
from backend.settings import CAN_VIEW_REQUESTS


class IsLoanApplier(permissions.BasePermission):
    # we get the last record in the Loan table we give permission according to the Loan status
    message = {'errors': 'you don\'t have permission to create loan'}
    def has_permission(self, request, view):
        if request.method == "POST":
            loan = Loan.objects.filter(employee=request.user).last()
            if loan:
                return (
                    (loan.loan_status == "finished")
                    or (loan.loan_status == "refused")
                    or (loan.loan_status == "draft")
                )

            else:
                return super().has_permission(request, view)
        else:
            return super().has_permission(request, view)


class IsFinancialaidApplier(permissions.BasePermission):
    message = {'errors': 'you don\'t have permission to create financial-aid'}
    def has_permission(self, request, view):
        if request.method == "POST" and "financial_aid_type" in request.data:
            financial_aid_type = request.data["financial_aid_type"]
            financial_aid = Financial_aid.objects.filter(
                employee=request.user,
                financial_aid_type=financial_aid_type,
                financial_aid_status="waiting",
            )
            if financial_aid.exists():
                return False
            else:
                return True
        else:
            return super().has_permission(request, view)


class CanViewRequests(permissions.BasePermission):
    message = {'errors': 'you don\'t have permission to view requests'}
    def has_permission(self, request, view):
        if request.method == "GET":
            perm = (
                request.user
                and request.user.is_authenticated
                and request.user.role in CAN_VIEW_REQUESTS
            )
            return perm
        return super().has_permission(request, view)

class IsPresident(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'president'
    

class IsVicePresident(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'vice_president'
    
class IsTresorier(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'tresorier'
    

class IsCommiteMember(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'membre'
    