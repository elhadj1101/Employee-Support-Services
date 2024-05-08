from django_filters import rest_framework as filters
from .models import Employee


class EmployeeFilter(filters.FilterSet):
    class Meta:
        model = Employee
        fields = {
            "email": ["exact"],
            "first_name": ["iexact"],
            "last_name": ["iexact"],
            "birth_date": ["exact", "gte", "lte", "lt", "gt"],
            "birth_adress": ["iexact"],
            "retired": ["exact"],
            "role": ["exact"],
            "salary": ["exact", "gte", "lte", "lt", "gt"],
            "martial_situation": ["exact"],
            "sexe": ["exact"],
            "recruted_at": ["exact", "gte", "lte", "lt", "gt"],
            "retired_at": ["exact", "gte", "lte", "lt", "gt"],
        }
