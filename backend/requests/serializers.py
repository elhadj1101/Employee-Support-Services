from rest_framework import serializers
from .models import Loan, Document, Financial_aid



class FileSerializer (serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ["id", "document_name", "document_file","document_uploaded_at","document_size" ]



class LoanSerializer(serializers.ModelSerializer):
    loan_amount = serializers.FloatField()
    loan_period = serializers.IntegerField(
        min_value=1,
        max_value=12,
    )
    documents = FileSerializer(many=True, read_only=True)
    
    class Meta:
        model = Loan
        fields = [
            'id',
            "loan_amount",
            "employee",
            "documents", 
            "request_created_at",
            "loan_motivation",
            "payment_method",
            "loan_period",
            "loan_status",
        ]
        extra_kwargs = {"loan_status": {"read_only": True} ,"employee": {"read_only": True}, "documents": {"read_only": True}}


class FinancialaidSerializer(serializers.ModelSerializer):
    documents = FileSerializer(many=True, read_only=True)
    class Meta:
        model = Financial_aid   
        fields = [
            "id",
            "employee",
            "request_created_at",
            "financial_aid_type",
            "documents",
            "family_member",
            "financial_aid_status",
            "request_response_at"
        ]
        extra_kwargs = {
            'financial_aid_status': {'read_only': True},
            'employee': {'read_only': True},
            'documents': {'read_only': True},
        }

    def validate(self, attrs):
        data = super().validate(attrs)
        if (
            data.get("financial_aid_type", None) == "family_member_death"
            and data.get("family_member") is None
        ):
            raise serializers.ValidationError(
                "you must include family_member in your request"
            )
        return data

