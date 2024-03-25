from rest_framework import serializers
from .models import Loan, Document, Financial_aid


class LoanSerializer(serializers.ModelSerializer):
    loan_amount = serializers.IntegerField()
    loan_period = serializers.IntegerField(
        min_value=1,
        max_value=12,
    )

    class Meta:
        model = Loan
        fields = [
            'id',
            "loan_amount",
            "request_created_at",
            "loan_motivation",
            "payment_method",
            "loan_period",
            "loan_status",
        ]
        extra_kwargs = {"loan_status": {"read_only": True}}


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ["document_name", "document_file"]


class FinancialaidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Financial_aid   
        fields = [
            "id",
            "request_created_at",
            "financial_aid_type",
            "family_member",
            "financial_aid_status",
            "request_response_at"
        ]

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
