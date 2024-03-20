from rest_framework import permissions
from .models import Loan , Financial_aid

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
        
class IsFinancialaidApplier(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST':
            financial_aid_type = request.data['financial_aid_type']
            financial_aid = Financial_aid.objects.filter(employee = request.user ,
                                                         financial_aid_type = financial_aid_type 
                                                        ).last()
            if financial_aid : 
                return (financial_aid.financial_aid_status == 'approved') or (financial_aid.financial_aid_statuss == 'refused')
            else : 
                return super().has_permission(request, view)
        else:
            return super().has_permission(request, view)