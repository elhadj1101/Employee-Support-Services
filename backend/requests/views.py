from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Loan, Financial_aid
from .serializers import LoanSerializer, FileSerializer, FinancialaidSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .permissions import IsLoanApplier, CanViewRequests
from rest_framework import generics
from .utils import calculate_max_loan

# Create your views here.



# LoanView endpoint to create a loan with post request ,
# or verify if you can apply to the loan with get request

# IsLoanApplier is a permission class to verify if the user has the right to apply for a loan
# for further information check permissions.py


class LoanView(APIView):
    permission_classes = [IsAuthenticated, CanViewRequests]

    def post(self, request):
        serializer = LoanSerializer(data=request.data)
        if serializer.is_valid():
            max = calculate_max_loan(request.user.salary, int(request.data["loan_period"]))
            loan_amount = float(request.data["loan_amount"])
            if max < loan_amount:
                return Response(
                    "maximumn loan amount {} ".format(max),
                )
            serializer.save(employee=request.user, loan_status="draft")
            return Response("loan created succefully")
        return Response(serializer.errors)
    # def get(self, request):
    #     loan = Loan.objects.filter(employee=request.user).last()
    #     if loan:
    #         if (loan.loan_status == "waiting") or (loan.loan_status == "approved"):
    #             return Response("you can't apply", status=status.HTTP_400_BAD_REQUEST)
    #     return Response("you can apply", status=status.HTTP_200_OK)
    # get should return allemployees requests (all of them)
    def get(self, request):
        loans = Loan.objects.all()
        if loans.exists():
            serializer = LoanSerializer(loans, many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response("No current requests", status=status.HTTP_200_OK)  
        

# This endpoint displays the loan history to see all the previous loans the employee has applied for.
class LoanHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        loans = Loan.objects.filter(employee=request.user)
    
        if loans:
            serializer = LoanSerializer(loans, many=True)
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
class FinancialaidView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated, CanViewRequests]
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
        serializer.save(employee=request.user, family_member=family_member , financial_aid_status  = 'draft')
        return Response("You applied for the financial aid successfully")


# This view to get all financial aids for the employee
    
class FinancialaidHistoryView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self  ,request ):
        financial_aids = Financial_aid.objects.filter(employee = request.user)
        if financial_aids.exists() :
            serializer = FinancialaidSerializer(financial_aids , many = True)
            return Response(serializer.data)
        return Response('you don\'t have any financial aids')
    
class SaveDraft(APIView ):
    permission_classes = [IsAuthenticated]
    def post(self, request, request_type):
        if request_type == 'financial_aid':
            financial_aid = Financial_aid.objects.filter(employee= request.user , financial_aid_status='draft').last()
            financial_aid.financial_aid_status = 'waiting' 
            financial_aid.save()
        elif request_type == 'loan':
            loan = Loan.objects.filter(employee= request.user , loan_status='draft').last()
            loan.loan_status = 'waiting'
            loan.save()


