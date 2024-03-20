from rest_framework import serializers
from .models import Loan , Document , Financial_aid


class LoanSerializer(serializers.ModelSerializer):
    loan_amount = serializers.IntegerField()
    loan_period = serializers.IntegerField(min_value = 1 , max_value = 12 , )
    class Meta: 
        model = Loan
        fields = [
           'loan_amount' ,  'loan_motivation' , 'payment_method' , 'loan_period' , 'loan_status'
        ]
        extra_kwargs = {
            'loan_status' : {'read_only' : True}
        }


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['document_name' , 'document_file'  ]

class FinancialaidSerializer(serializers.ModelSerializer):
    family_member = serializers.CharField(allow_blank = True , default = None)
    class Meta:
        model = Financial_aid
        fields = ['financial_aid_type' , 'family_member' , ]
    def validate(self, attrs):
        data = super().validate(attrs)
        if data.get('financial_aid_type') == 'family_member_death' and data.get('family_member' ) is None:
            raise serializers.ValidationError('you must include family_member in your request')
        elif not data.get('financial_aid_type' , ) =='family_member_death' and not data.get('family_member') is None:
            raise serializers.ValidationError('you must remove family_member from your request')

        return data