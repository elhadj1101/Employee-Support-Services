from rest_framework import serializers
from .models import Record
from requests.serializers import LoanSerializer, FinancialaidSerializer

class RecordSerializer(serializers.ModelSerializer):
    loan = LoanSerializer(read_only=True)
    financial_aid = FinancialaidSerializer(read_only=True)
    class Meta :
        model = Record
        fields = ['type','amount','financial_aid','loan','motif']
        extra_kwargs = {"financial_aid": {"read_only": True}, "loan": {"read_only": True}}
        