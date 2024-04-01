from rest_framework import serializers
from .models import ExpenceIncome


class ExpenseIncomeSerializer(serializers.ModelSerializer):
    class Meta :
        model = ExpenceIncome
        fields = ['type','amount','tag','motif']