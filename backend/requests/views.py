from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Loan, Financial_aid, Document
from .serializers import LoanSerializer, FinancialaidSerializer
from rest_framework import status
from .permissions import (
    IsLoanApplier,
    CanViewRequests,
    IsFinancialaidApplier,
    IsPresident,
    IsVicePresident,
    IsTresorier,
)
from funds_management.models import Commity
from django.shortcuts import get_object_or_404
from rest_framework import generics
from .utils import calculate_max_loan
from django.http import HttpResponse
from datetime import date
from .filters import LoanFilter, FinancialaidFilter


# Create your views here.


# LoanView endpoint to create a loan with post request ,
# or verify if you can apply to the loan with get request

# IsLoanApplier is a permission class to verify if the user has the right to apply for a loan
# for further information check permissions.py


class LoanView(APIView):
    permission_classes = [IsAuthenticated, CanViewRequests, IsLoanApplier]

    def post(self, request):
        serializer = LoanSerializer(data=request.data)
        if serializer.is_valid():
            max = calculate_max_loan(
                request.user.salary, int(request.data["loan_period"])
            )
            amount = float(request.data["amount"])
            if max < amount:
                return Response(
                    {"error": "maximumn loan amount {} ".format(max)},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            isDraft = request.query_params.get("brouillon", None)
            if isDraft == "true":
                loan_status = "brouillon"
            elif isDraft == "false":
                loan_status = "waiting"
            else:

                return Response(
                    {"error": "Valeur du paramètre 'brouillon' de requête non valide"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if (
                loan_status == "brouillon"
                and Loan.objects.filter(
                    employee=request.user,
                    loan_status="brouillon",
                ).exists()
            ):
                return Response(
                    {"error": "vous ne pouvez pas créer de brouillon, vous en avez déjà un"},
                    status=status.HTTP_403_FORBIDDEN,
                )

            files = request.FILES.getlist("files[]", [])
            if not files and loan_status == "waiting":
                return Response(
                    {"error": "vous devez télécharger des fichiers"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            created_instance = serializer.save(
                employee=request.user, loan_status=loan_status,
            request_created_at=(date.today() if loan_status == "waiting" else None),
                
            )
            for f in files:
                d = Document(
                    employee=request.user,
                    document_file=f,
                    document_name=f.name,
                    financial_aid=None,
                    loan=created_instance,
                )
                d.save()
            return Response(
                {"sucess": "prêt créé avec succès"}, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors)

    def get(self, request):
        execlution_criteria = {"loan_status": "brouillon"}
        loans = Loan.objects.exclude(**execlution_criteria).order_by(
            "-request_response_at", "-request_created_at"
        )
        filter = LoanFilter(request.GET, queryset=loans)
        if filter.qs.exists():
            serializer = LoanSerializer(filter.qs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response("No current loans", status=status.HTTP_200_OK)


class LoanCheckView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        loan = Loan.objects.filter(employee=request.user).last()
        if loan:
            if (loan.loan_status == "waiting") or (loan.loan_status == "approved"):
                return Response("False", status=status.HTTP_200_OK)
        return Response("True", status=status.HTTP_200_OK)


# This endpoint displays the loan history to see all the previous loans the employee has applied for.
class LoanHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        loans = Loan.objects.filter(employee=request.user).order_by(
            "-request_created_at"
        )
        serializer = LoanSerializer(loans, many=True)
        if loans:
            return Response(serializer.data)
        return Response([])


# This view will be used for uploading files in the financial aid functionnality


# This view will be used for creating financial aids
class FinancialaidView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated, CanViewRequests, IsFinancialaidApplier]
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
        isDraft = request.query_params.get("brouillon")
        if isDraft == "true":
            aid_status = "brouillon"
        elif isDraft == "false":
            aid_status = "waiting"
        else:
            return Response(
                {"error": "Valeur du paramètre de brouillon non valide"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if (
            aid_status == "brouillon"
            and Financial_aid.objects.filter(
                employee=request.user,
                financial_aid_status="brouillon",
            ).exists()
        ):
            return Response(
                {"error": "vous ne pouvez pas créer de brouillon, vous en avez déjà un"},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer.is_valid(raise_exception=True)
        if (
            request.data["financial_aid_type"] == "retirement_financial_aid"
            and not request.user.retired
        ):
            return Response(
                {"error": "l'employé n'est pas à la retraite"}, status=status.HTTP_403_FORBIDDEN
            )
        try:
            amount = float(request.data["amount"])
        except Exception as e:
            return Response(
                {"error": "le montant doit être un nombre"}, status=status.HTTP_400_BAD_REQUEST
            )
        created_instance = serializer.save(
            employee=request.user,
            amount=amount,
            family_member=family_member,
            financial_aid_status=aid_status,
            request_created_at=(date.today() if aid_status == "waiting" else None),
        )
        # now create the files
        files = request.FILES.getlist("files[]", [])
        if not files and aid_status == "waiting":
            return Response(
                {"error": "vous devez télécharger des fichiers"}, status=status.HTTP_400_BAD_REQUEST
            )
        for f in files:
            d = Document(
                employee=request.user,
                document_file=f,
                document_name=f.name,
                financial_aid=created_instance,
                loan=None,
            )
            d.save()
        return Response(
            {"success": "aide financière créée"}, status=status.HTTP_201_CREATED
        )

    def list(self, request, *args, **kwargs):
        execlution_criteria = {"financial_aid_status": "brouillon"}
        financail_aids = Financial_aid.objects.exclude(**execlution_criteria).order_by(
            "-request_response_at", "-request_created_at"
        )
        filter = FinancialaidFilter(request.GET, queryset=financail_aids)
        if filter.qs.exists():
            serializer = FinancialaidSerializer(filter.qs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response([], status=status.HTTP_200_OK)


# This view to get all financial aids for the employee


class FinancialaidHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        financial_aids = Financial_aid.objects.filter(employee=request.user).order_by(
            "-request_created_at"
        )
        if financial_aids.exists():
            serializer = FinancialaidSerializer(financial_aids, many=True)
            return Response(serializer.data)
        return Response([])


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
                    return Response("False", status=status.HTTP_200_OK)
                else:
                    return Response("True", status=status.HTTP_200_OK)
            return Response(
                {"error": "Type invalide dans le paramètre de requête"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:

            return Response(
                {"error": "Paramètre 'aid_type' manquant dans la requête"},
                status=status.HTTP_400_BAD_REQUEST,
            )


# To use this view specify request_type (loan|financial-aid) as url
# also use brouillon query parameter
# for example http://127.0.0.1:8000/api/requests/financial-aid/pk?brouillon=true


class UpdateRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, request_type, pk):
        if request_type in ["loans", "financial-aids"]:
            match request_type:
                case "loans":
                    loan = get_object_or_404(Loan, pk=pk)
                    if loan.employee != request.user:
                        return Response(
                            {"error": "vous n'êtes pas autorisé à supprimer ce prêt"},
                            status=status.HTTP_403_FORBIDDEN,
                        )
                    if loan.loan_status not in ["brouillon"]:
                        return Response(
                            {"error": "this loan is not brouillon"},
                            status=status.HTTP_403_FORBIDDEN,
                        )
                    loan.delete()
                    return Response({"success": "prêt supprimé avec succès"})
                case "financial-aids":
                    financial_aid = get_object_or_404(Financial_aid, pk=pk)
                    if financial_aid.employee != request.user:
                        return Response(
                            {
                                "error": "Vous n'êtes pas autorisé à supprimer cette aide financière"
                            },
                            status=status.HTTP_403_FORBIDDEN,
                        )
                    if financial_aid.financial_aid_status not in ["brouillon"]:
                        return Response(
                            {"error": "Cette aide financière n'est pas brouillon"},
                            status=status.HTTP_403_FORBIDDEN,
                        )
                    financial_aid.delete()
                    return Response({"success": "aide financière supprimée avec succès"})

        else:
            return Response(
                {"error": "Page non trouvée"}, status=status.HTTP_404_NOTpage_FOUND
            )

    def patch(self, request, request_type, pk):
        # check if the url contains loan or financial-aid
        if request_type in ["loans", "financial-aids"]:
            # check for the brouillon query parameter
            isDraft = request.query_params.get("brouillon")
            if isDraft == "true":
                aid_status = "brouillon"
                request_created_at = None
            elif isDraft == "false":
                aid_status = "waiting"
                request_created_at = date.today()
            else:
                return Response(
                    {"error": "Valeur du paramètre de brouillon non valide"}, status=status.HTTP_400_BAD_REQUEST
                )
            # update the loan object
            if request_type == "loans":
                loan = get_object_or_404(Loan, pk=pk, employee=request.user)
                # only brouillon records can be updated
                if loan.loan_status != "brouillon":
                    return Response(
                        {"error": "Ce pret n'est pas un brouillon"}, status=status.HTTP_403_FORBIDDEN
                    )

                # handling old files
                # old files will be considered as string containing the paths for the old files
                # this path we have in the database will be checked if it is contained in this string (old_files)
                old_files = request.data.getlist("old_files[]", [])
                loan_documents = Document.objects.filter(loan=pk)
                documents_paths = (
                    loan_documents.values_list("document_file", flat=True)
                    if loan_documents
                    else []
                )

                for document_path in documents_paths:
                    if document_path not in old_files:
                        Document.objects.filter(document_file=document_path).delete()

                # creating new files
                new_files = request.FILES.getlist("files[]", [])
                if new_files:
                    for f in new_files:
                        d = Document(
                            employee=request.user,
                            document_file=f,
                            document_name=f.name,
                            financial_aid=None,
                            loan=loan,
                        )
                        d.save()

                if (
                    not new_files
                    and not Document.objects.filter(loan=pk)
                    and aid_status == "waiting"
                ):
                    return Response(
                        {"error": "vous devez télécharger des fichiers"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                serializer = LoanSerializer(loan, data=request.data, partial=True)
                serializer.is_valid(raise_exception=True)
                serializer.save(
                    loan_status=aid_status, request_created_at=request_created_at
                )
                return Response({"success": "prêt mis à jour avec succès"})

            # update the financial-aid object
            elif request_type == "financial-aids":
                financial_aid = get_object_or_404(
                    Financial_aid, pk=pk, employee=request.user
                )
                # only brouillon records can be updated
                if financial_aid.financial_aid_status != "brouillon":
                    return Response(
                       {"error": "this financial-aid is not brouillon"},
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
                        {"error": "tu ne peux pas changer de membre de la famille"},
                        status=status.HTTP_403_FORBIDDEN,
                    )

                old_files = request.data.getlist("old_files[]", [])
                financial_aid_documents = Document.objects.filter(financial_aid=pk)

                documents_paths = (
                    financial_aid_documents.values_list("document_file", flat=True)
                    if financial_aid_documents
                    else []
                )
                for document_path in documents_paths:
                    if document_path not in old_files:
                        Document.objects.filter(document_file=document_path).delete()

                # creating new files
                new_files = request.FILES.getlist("files[]", [])
                if new_files:
                    for f in new_files:
                        d = Document(
                            employee=request.user,
                            document_file=f,
                            document_name=f.name,
                            financial_aid=financial_aid,
                            loan=None,
                        )
                        d.save()
                if (
                    not new_files
                    and not Document.objects.filter(financial_aid=pk)
                    and aid_status == "waiting"
                ):
                    return Response(
                        {"error": "vous devez télécharger des fichiers"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                serializer = FinancialaidSerializer(
                    financial_aid, data=request.data, partial=True
                )
                serializer.is_valid(raise_exception=True)
                serializer.save(
                    financial_aid_status=aid_status,
                    request_created_at=request_created_at,
                )
                return Response({"success": "aide financière mise à jour avec succès"})
            else:
                return Response(
                    {"error": "Page non trouvée"}, status=status.HTTP_404_NOT_FOUND
                )
        else:
            return Response(
                {"error": "Page non trouvée"}, status=status.HTTP_404_NOT_FOUND
            )


class UpdateRequestStatusView(APIView):
    permission_classes = [
        IsAuthenticated,
        (IsTresorier | IsPresident | IsVicePresident),
    ]

    def patch(self, request, request_type, pk):

        model_class = {"loans": Loan, "financial-aids": Financial_aid}.get(request_type)

        if not model_class:
            return Response(
                {"error": "Page non trouvée"}, status=status.HTTP_404_NOT_FOUND
            )

        if "new_status" not in request.data:
            return Response(
                {"error": "vous devez inclure new_status dans votre demande"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        obj = get_object_or_404(model_class, pk=pk)
        updated_status = request.data["new_status"]

        valid_new_status = ("approved", "refused")
        old_status = (
            obj.loan_status if model_class == Loan else obj.financial_aid_status
        )
        valid_old_status = ("approved", "refused", "waiting")
        if (
            old_status in valid_old_status
            and updated_status in valid_new_status
            and old_status != updated_status
        ):
            # I had an error using request.user.has_perm function
            # so I remove it
            if (
                not request.user.role == "president"
                and not request.user.role == "vice_president"
            ):
                return Response(
                    {"error": "vous n'avez pas l'autorisation requise"},
                    status=status.HTTP_403_FORBIDDEN,
                )
            if model_class == Loan:
                obj.loan_status = updated_status
            else:
                obj.financial_aid_status = updated_status
            obj.request_response_at = date.today()
            obj.save()
            return Response(
                {"success": "statut mis à jour avec succès"}, status=status.HTTP_200_OK
            )
        elif (
            old_status == "approved"
            and updated_status == "finished"
            and model_class == Loan
        ):
            if not request.user.role == "tresorier":
                return Response(
                    {"error": "vous n'avez pas l'autorisation requise"},
                    status=status.HTTP_403_FORBIDDEN,
                )
            obj.loan_status = updated_status
            obj.save()

            # now to update the total yearly expenses
            currnt_commity = Commity.objects.get(pk=1)
            if currnt_commity.current_year == date.today().year:
                currnt_commity.current_year_expenses += obj.amount
                currnt_commity.current_balance -= obj.amount
                currnt_commity.save()
            else:
                currnt_commity.current_year = date.today().year
                currnt_commity.current_year_expenses = obj.amount
                currnt_commity.current_balance -= obj.amount
                currnt_commity.save()
            return Response(
                {"success": "statut mis à jour avec succès"}, status=status.HTTP_200_OK
            )

        else:
            return Response(
                {"error": "le statut ne peut pas être mis à jour"}, status=status.HTTP_400_BAD_REQUEST
            )
