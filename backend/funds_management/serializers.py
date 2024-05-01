from rest_framework import serializers
from .models import Record, Commity
from requests.serializers import LoanSerializer, FinancialaidSerializer

class RecordSerializer(serializers.ModelSerializer):
    loan = LoanSerializer(read_only=True)
    financial_aid = FinancialaidSerializer(read_only=True)
    class Meta :
        model = Record
        fields = ['id','type','amount','financial_aid','loan','motif','created_at']
        extra_kwargs = {"created_at": {"read_only": True}}


class CommitySerializer(serializers.ModelSerializer):
    class Meta :
        model = Commity
        fields = ['name','current_balance','current_year_expenses','current_year_income']
        