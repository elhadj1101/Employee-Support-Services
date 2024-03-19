from rest_framework import serializers
from .models import Loan , Document


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
