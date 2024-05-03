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
    created_at__year = serializers.IntegerField(required=False )
    created_at__month =serializers.IntegerField(required=False )
    total_expense=serializers.DecimalField(max_digits=40,decimal_places=2)
    total_income=serializers.DecimalField(max_digits=40,decimal_places=2)
    total_records=serializers.IntegerField()
    count_loans_expense=serializers.IntegerField()
    count_loans_income = serializers.IntegerField()
    count_financial_aids=serializers.IntegerField()
    total_expense_loans=serializers.DecimalField(max_digits=40,decimal_places=2)
    total_income_loans=serializers.DecimalField(max_digits=40,decimal_places=2)
    total_expense_financial_aids=serializers.DecimalField(max_digits=40,decimal_places=2)
