from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Loan, Financial_aid
from .serializers import LoanSerializer, FileSerializer, FinancialaidSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .permissions import IsLoanApplier
from rest_framework import generics

# Create your views here.


# 12 months duration
DURATION = 12


def calculate_max_loan(salary):
    return float(salary) * 0.3 * DURATION


# LoanView endpoint to create a loan with post request ,
# or verify if you can apply to the loan with get request

# IsLoanApplier is a permission class to verify if the user has the right to apply for a loan
# for further information check permissions.py


class LoanView(APIView):
    permission_classes = [IsAuthenticated, IsLoanApplier]

    def post(self, request):
        serializer = LoanSerializer(data=request.data)
        if serializer.is_valid():
            max = calculate_max_loan(request.user.salary)
            loan_amount = float(request.data["loan_amount"])
            if max < loan_amount:
                return Response(
                    "maximumn loan amount {} ".format(max),
                )
            serializer.save(employee=request.user, loan_status="waiting")
            return Response("loan created succefully")
        return Response(serializer.errors)

    def get(self, request):
        loan = Loan.objects.filter(employee=request.user).last()
        if loan:
            if (loan.loan_status == "waiting") or (loan.loan_status == "approved"):
                return Response("you can't apply", status=status.HTTP_400_BAD_REQUEST)
        return Response("you can apply", status=status.HTTP_200_OK)


# This endpoint displays the loan history to see all the previous loans the employee has applied for.
class LoanHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        loans = Loan.objects.filter(employee=request.user)
        serializer = LoanSerializer(loans, many=True)
        if loans:
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response("you don't have any loans", status=status.HTTP_200_OK)


# This view will be used for uploading files in the financial aid functionnality


class UploadFileView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = FileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(employee=request.user)
            return Response("file uploaded succesfully", status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# This view will be used for creating financial aids 
class FinancialaidView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Financial_aid.objects.all()
    serializer_class = FinancialaidSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        family_member = (
            request.data["family_member"]
            if (request.data["financial_aid_type"] == "family_member_death" and "family_member" in request.data)
            else None
        )
        serializer.is_valid(raise_exception=True)
        serializer.save(employee=request.user, family_member=family_member , financial_aid_status  = 'waiting')
        return Response("You applied for the financial aid successfully")
