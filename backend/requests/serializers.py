from rest_framework import serializers
from .models import Loan, Document, Financial_aid
from authentication.serializers import PartialEmployeeSerializer


class FileSerializer (serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ["id", "document_name", "document_file","document_uploaded_at","document_size" ]



class LoanSerializer(serializers.ModelSerializer):
    amount = serializers.DecimalField(max_digits=50, decimal_places=2)
    loan_period = serializers.IntegerField(
        min_value=1,
        max_value=12,
    )
    documents = FileSerializer(many=True, read_only=True)
    employee = PartialEmployeeSerializer(read_only=True)
    class Meta:
        model = Loan
        fields = [
            'id',
            "amount",
            "employee",
            "documents", 
            "paid_amount",
            "request_created_at",
            "loan_motivation",
            "payment_method",
            "loan_period",
            "loan_status",
        ]
        extra_kwargs = {"loan_status": {"read_only": True} ,"employee": {"read_only": True},"paid_amount": {"read_only": True}, "documents": {"read_only": True}}
    def validate(self, attrs):
        data = super().validate(attrs)
        if (
            data.get("paid_amount", 0) != 0 
            and data.get("loan_status", None) != "approved"
        ):
            raise serializers.ValidationError(
                {"error": "tu ne peux pas payer un prêt non approuvé mon frère ?!"}
            )
        return data


class FinancialaidSerializer(serializers.ModelSerializer):
    documents = FileSerializer(many=True, read_only=True)
    employee = PartialEmployeeSerializer(read_only=True)
    
    class Meta:
        model = Financial_aid   
        fields = [
            "id",
            "employee",
            "request_created_at",
            "financial_aid_type",
            "documents",
            "amount",
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
                {"error": "vous devez inclure family_member dans votre demande"}
            )
        return data

