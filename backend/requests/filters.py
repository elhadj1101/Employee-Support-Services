from django_filters import rest_framework as filters
from .models import Loan, Financial_aid


class LoanFilter(filters.FilterSet):
    class Meta:
        model = Loan
        fields = {
            "amount": ["exact", "gte", "lte", "lt", "gt"],
            "loan_status": ["exact"],
            "loan_period": ["exact", "gte", "lte", "lt", "gt"],
            "request_created_at": ["exact", "gte", "lte", "lt", "gt"],
            "employee": ["exact"],
        }


class FinancialaidFilter(filters.FilterSet):
    class Meta:
        model = Financial_aid
        fields = {
            "amount": ["exact", "gte", "lte", "lt", "gt"],
            "financial_aid_type": ["exact"],
            "family_member": ["exact"],
            "financial_aid_status": ["exact"],
            "request_created_at": ["exact", "gte", "lte", "lt", "gt"],
            "employee": ["exact"],
        }
