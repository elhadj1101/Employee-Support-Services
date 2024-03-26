from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Loan, Financial_aid
from .serializers import LoanSerializer, FileSerializer, FinancialaidSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .permissions import (
    IsLoanApplier,
    CanViewRequests,
    IsFinancialaidApplier,
    IsPresident,
)
from django.shortcuts import get_object_or_404
from rest_framework import generics
from .utils import calculate_max_loan

# Create your views here.


# LoanView endpoint to create a loan with post request ,
# or verify if you can apply to the loan with get request

# IsLoanApplier is a permission class to verify if the user has the right to apply for a loan
# for further information check permissions.py


class LoanView(APIView):
    permission_classes = [IsAuthenticated,CanViewRequests, IsLoanApplier]

    def post(self, request):
        serializer = LoanSerializer(data=request.data)
        if serializer.is_valid():
            max = calculate_max_loan(
                request.user.salary, int(request.data["loan_period"])
            )
            loan_amount = float(request.data["loan_amount"])
            if max < loan_amount:
                return Response(
                    "maximumn loan amount {} ".format(max),
                )
            isDraft = request.query_params.get("draft",None)
            if isDraft == "true":
                aid_status = "draft"
            elif isDraft == "false":
                aid_status = "waiting"
            else:
                return Response(
                    "Invalid query param value", status=status.HTTP_400_BAD_REQUEST
                )

            if (
                aid_status == "draft"
                and Loan.objects.filter(
                    employee=request.user,
                    loan_status="draft",
                ).exists()
            ):
                return Response(
                    "you can't create draft", status=status.HTTP_403_FORBIDDEN
                )

            serializer.save(employee=request.user, loan_status=aid_status)
            return Response("loan created succefully")
        return Response(serializer.errors)

    def get(self, request):
        execlution_criteria = {
            'loan_status'  : 'draft'
        }
        loans = Loan.objects.exclude(**execlution_criteria)
        if loans.exists():
            serializer = LoanSerializer(loans, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response("No current loans", status=status.HTTP_200_OK)


class LoanCheckView(APIView):
    permission_classes = [IsAuthenticated]
    
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

        if loans:
            serializer = LoanSerializer(loans, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response("you don't have any loans", status=status.HTTP_200_OK)


# This view will be used for uploading files in the financial aid functionnality


# This view will be used for creating financial aids
class FinancialaidView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated,CanViewRequests, IsFinancialaidApplier]
    queryset = Financial_aid.objects.all()
    serializer_class = FinancialaidSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        family_member = (
            request.data["family_member"]
            if (
                "financial_aid_type" in request.data
                and request.data["financial_aid_type"] == "family_member_death"
                and "family_member" in request.data
            )
            else None
        )
        isDraft = request.query_params.get("draft")
        if isDraft == "true":
            aid_status = "draft"
        elif isDraft == "false":
            aid_status = "waiting"
        else:
            return Response(
                "Invalid query param value", status=status.HTTP_400_BAD_REQUEST
            )
        if (
            aid_status == "draft"
            and Financial_aid.objects.filter(
                employee=request.user,
                financial_aid_status="draft",
            ).exists()
        ):
            return Response("you can't create draft", status=status.HTTP_403_FORBIDDEN)
        
        serializer.is_valid(raise_exception=True)
        if request.data['financial_aid_type'] == 'retirement_financial_aid' and not request.user.retired :
            return Response('Employee is not retired' , status=status.HTTP_403_FORBIDDEN)
        serializer.save(
            employee=request.user,
            family_member=family_member,
            financial_aid_status=aid_status,
        )
        return Response("Financial aid created")
    
    def list(self, request, *args, **kwargs):
        execlution_criteria = {
            'financial_aid_status' : 'draft'
        }
        financail_aids = Financial_aid.objects.exclude(**execlution_criteria)
        if financail_aids :
            serializer =  FinancialaidSerializer(financail_aids , many = True)
            return Response(serializer.data , )
        return Response('No current financial aids')
    



# This view to get all financial aids for the employee


class FinancialaidHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        financial_aids = Financial_aid.objects.filter(employee=request.user)
        if financial_aids.exists():
            serializer = FinancialaidSerializer(financial_aids, many=True)
            return Response(serializer.data)
        return Response("you don't have any financial aids")


class FinancialaidCheckView(APIView):
    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request, *args, **kwargs):
        aid_type = request.query_params.get("aid_type")
        aid_type_choices = dict(Financial_aid.financial_aid_type_options)
        if aid_type:
            if aid_type in aid_type_choices:
                financial_aid = Financial_aid.objects.filter(
                    employee=request.user,
                    financial_aid_type=aid_type,
                )
                if financial_aid.filter(financial_aid_status="waiting").exists():
                    return Response("you can't apply")
                else:
                    return Response("you can apply")
            return Response(
                "Invalid type in the query parameter",
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:

            return Response(
                "Missing 'aid_type' parameter in the request",
                status=status.HTTP_400_BAD_REQUEST,
            )


class UploadFileView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = FileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(employee=request.user)
            return Response("file uploaded succesfully", status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# To use this view specify request_type (loan|financial-aid) as url
# also use draft query parameter
# for example http://127.0.0.1:8000/api/requests/financial-aid/pk?draft=true


class UpdateRequestView(APIView):
    def patch(self, request, request_type, pk):
        # check if the url contains loan or financial-aid
        if request_type in ["loan", "financial-aid"]:
            # check for the draft query parameter
            isDraft = request.query_params.get("draft")
            if isDraft == "true":
                aid_status = "draft"
            elif isDraft == "false":
                aid_status = "waiting"
            else:
                return Response(
                    "Invalid query param value", status=status.HTTP_400_BAD_REQUEST
                )

            # update the loan object
            if request_type == "loan":
                loan = get_object_or_404(Loan, pk=pk)
                # only draft records can be updated
                if loan.loan_status != "draft":
                    return Response(
                        "this loan is not draft", status=status.HTTP_403_FORBIDDEN
                    )
                serializer = LoanSerializer(loan, data=request.data, partial=True)
                serializer.is_valid(raise_exception=True)
                serializer.save(loan_status=aid_status)
                return Response("loan changed succesfully")

            # update the financial-aid object
            elif request_type == "financial-aid":
                financial_aid = get_object_or_404(Financial_aid, pk=pk)
                # only draft records can be updated
                if financial_aid.financial_aid_status != "draft":
                    return Response(
                        "this financial-aid is not draft",
                        status=status.HTTP_403_FORBIDDEN,
                    )
                # family_member can only be changed if the financial_aid_type  is family_member_death
                aid_type = (
                    request.data["financial_aid_type"]
                    if "financial_aid_type" in request.data
                    else financial_aid.financial_aid_type
                )
                if (
                    "family_member" in request.data
                    and aid_type != "family_member_death"
                ):
                    return Response(
                        "you can't change family member",
                        status=status.HTTP_403_FORBIDDEN,
                    )

                serializer = FinancialaidSerializer(
                    financial_aid, data=request.data, partial=True
                )
                serializer.is_valid(raise_exception=True)
                serializer.save(financial_aid_status=aid_status)
                return Response("financial aid changed succesfully")

        else:
            return Response("page not found", status=status.HTTP_404_NOT_FOUND)
