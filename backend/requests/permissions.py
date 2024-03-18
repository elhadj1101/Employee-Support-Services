from rest_framework import permissions
from .models import Loan

class IsLoanApplier(permissions.BasePermission):

    # we get the last record in the Loan table we give permission according to the Loan status
    def has_permission(self, request, view):
        if request.method == 'POST':
            loan = Loan.objects.filter(employee = request.user).last()
            if loan : 
                return (loan.loan_status == 'finished') or (loan.loan_status == 'refused')
            else : 
                return super().has_permission(request, view)
        else:
            return super().has_permission(request, view)