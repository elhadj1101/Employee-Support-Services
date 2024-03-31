from rest_framework import serializers
from .models import ExpenceIncome


class ExpenceIncomeSerializer(serializers.Serializer):
    class Meta :
        model = ExpenceIncome
        fields = ['type','amount','tag','motif']