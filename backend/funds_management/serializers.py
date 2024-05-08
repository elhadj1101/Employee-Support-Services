from rest_framework import serializers
from .models import Record, Commity
from requests.models import Loan, Financial_aid
from requests.serializers import LoanSerializer, FinancialaidSerializer
from django.core.exceptions import ObjectDoesNotExist

class RecordViewSerializer(serializers.ModelSerializer):
    loan = LoanSerializer(required=False)
    financial_aid = FinancialaidSerializer(required=False)
    class Meta :
        model = Record
        fields = ['id','type','amount','financial_aid','loan','motif','created_at']
        extra_kwargs = {"created_at": {"read_only": True}, "id": {"read_only": True} , "financial_aid": {"required": False}, "loan": {"required": False}}
    
    def validate(self, attrs):
        data = super().validate(attrs)
        if (
            data.get("financial_aid", None)
            and data.get("loan", None) 
        ):
            raise serializers.ValidationError(
                "only one of financial_aid or loan can be included in the request"
        )
        
        
        return data
class RecordSerializer(serializers.ModelSerializer):
    loan = serializers.PrimaryKeyRelatedField(queryset=Loan.objects.all(), required=False)
    financial_aid = serializers.PrimaryKeyRelatedField(queryset=Financial_aid.objects.all(), required=False)
    
    class Meta :
        model = Record
        fields = ['type','amount','financial_aid','loan','motif']    
    def validate(self, attrs):
        data = super().validate(attrs)
        if (
            data.get("financial_aid", None)
            and data.get("loan", None) 
        ):
            raise serializers.ValidationError(
                "only one of financial_aid or loan can be included in the request"
        )
        
        
        return data

class CommitySerializer(serializers.ModelSerializer):
    class Meta :
        model = Commity
        fields = ['name','current_balance','current_year_expenses','current_year_income']
        
    
class RecordAnaliticsSerializer(serializers.Serializer):

    created_at = serializers.DateField(required=False)
    aid_type=serializers.CharField(required=False)
    created_at__year = serializers.IntegerField(required=False )
    created_at__month =serializers.IntegerField(required=False )
    total_expense=serializers.DecimalField(max_digits=40,decimal_places=2,required=False)
    total_income=serializers.DecimalField(max_digits=40,decimal_places=2,required=False)
    total_records=serializers.IntegerField(required=False)
    count_loans_expense=serializers.IntegerField(required=False)
    count_loans_income = serializers.IntegerField(required=False)
    count_financial_aids=serializers.IntegerField(required=False)
    total_expense_loans=serializers.DecimalField(max_digits=40,decimal_places=2,required=False)
    total_income_loans=serializers.DecimalField(max_digits=40,decimal_places=2,required=False)
    total_expense_financial_aids=serializers.DecimalField(max_digits=40,decimal_places=2,required=False)
    total_amount =serializers.DecimalField(max_digits=40,decimal_places=2,required=False)