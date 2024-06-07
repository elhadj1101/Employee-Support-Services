from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from .models import Record, Commity
from datetime import date
from rest_framework import status
from .serializers import RecordSerializer, CommitySerializer, RecordAnaliticsSerializer, RecordViewSerializer
from .permissions import IsTreasurer, CanViewCommity
from django.core.exceptions import ValidationError
from django.db.models import Sum, Count, Q, F
from requests.models import Financial_aid 

# Create your views here.
class RecordView(generics.ListCreateAPIView):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    # permission_classes = [AllowAny]
    permission_classes = [IsAuthenticated,IsTreasurer]
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = RecordViewSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = RecordViewSerializer(queryset, many=True)
        return Response(serializer.data)
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # alter loan paid_amount if the record is income and have loan
        if serializer.validated_data.get('type') == "income" and serializer.validated_data.get('loan', None) is not None:
            loan = serializer.validated_data.get('loan')
            if loan.loan_status != "approved" and loan.loan_status != "payment_started": 
                return Response({"error": "vous ne pouvez pas payer un prêt non approuvé"}, status=status.HTTP_400_BAD_REQUEST)
            if loan.paid_amount + serializer.validated_data.get('amount') > loan.amount*loan.loan_period:
                return Response({"error": "vous ne pouvez pas payer plus que le montant du prêt"}, status=status.HTTP_400_BAD_REQUEST)  
            if (loan.paid_amount + serializer.validated_data.get('amount') == loan.amount*loan.loan_period):
                loan.loan_status = "finished"        
            loan.paid_amount += serializer.validated_data.get('amount')
            
            loan.save()
        # update commity balance
        commity = Commity.objects.all().first()
        if commity is None:
            return Response({"error": "aucun comité trouvé"}, status=400)
        if serializer.validated_data.get('type') == "expense":
            commity.current_balance -= serializer.validated_data.get('amount')
        else:
            commity.current_balance += serializer.validated_data.get('amount')
        if date.today().year != commity.current_year:
            commity.current_year = date.today().year
            if serializer.validated_data.get('type') == "expense":
                commity.current_year_expenses = serializer.validated_data.get('amount')
                commity.current_year_income = 0
            else:
                commity.current_year_expenses = 0
                commity.current_year_income = serializer.validated_data.get('amount')
        
        else:
            if serializer.validated_data.get('type') == "expense":
                commity.current_year_expenses += serializer.validated_data.get('amount')
            else:
                commity.current_year_income += serializer.validated_data.get('amount')
        commity.save()
        if serializer.validated_data.get('type') == "expense": 
            financial_aid = serializer.validated_data.get('financial_aid', None)
            if financial_aid is not None:
                print(financial_aid.financial_aid_status)
                if (financial_aid.financial_aid_status == "approved") :
                    financial_aid.financial_aid_status = "finished"
                    financial_aid.save()
                else:
                    return Response({"error": "vous ne pouvez pas payer une aide financière non approuvée ou terminée"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                loan = serializer.validated_data.get('loan', None)
                if (loan is not None) :
                    if (loan.loan_status == "approved") :
                        loan.loan_status = "payment_started"
                        loan.save()
                    else:
                        return Response({"error": "vous ne pouvez pas rembourser un prêt non approuvé ou terminé"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({"error": "veuillez sélectionner un prêt ou une aide financière à payer"}, status=status.HTTP_400_BAD_REQUEST)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class SingleRecordView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RecordSerializer
    # permission_classes = [AllowAny]
    permission_classes = [IsAuthenticated,IsTreasurer]
    def get_queryset(self):
        return Record.objects.filter(pk=self.kwargs['pk'])
    def delete(self, request, *args, **kwargs):
        obj = self.get_object()
        if obj.type == "income" and obj.loan is not None:
            if (obj.loan.paid_amount - obj.amount < 0):
                return Response({"error": "vous ne pouvez pas supprimer un paiement qui n'existe pas"}, status=400)
            if (obj.loan.paid_amount - obj.amount== 0):
                obj.loan.loan_status = "approved"
            obj.loan.paid_amount -= obj.amount
            obj.loan.save()
        commity = Commity.objects.all().first()
        if commity is None:
            return Response({"error": "aucun comité trouvé"}, status=400)
        if obj.type == "expense":
            commity.current_balance += obj.amount
            commity.current_year_expenses -= obj.amount
        else:
            commity.current_balance -= obj.amount
            commity.current_year_income -= obj.amount
        commity.save()
        if obj.type == "expense":
            financial_aid = obj.financial_aid
            if financial_aid is not None:
                financial_aid.financial_aid_status = "approved"
                financial_aid.save()
        return self.destroy(request, *args, **kwargs)
class CommityView(generics.ListCreateAPIView):
    queryset = Commity.objects.all()
    serializer_class = CommitySerializer
    # permission_classes = [AllowAny]
    permission_classes = [IsAuthenticated,CanViewCommity]

class SingleCommityView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommitySerializer
    # permission_classes = [AllowAny]
    permission_classes = [IsAuthenticated,CanViewCommity]
    def get_queryset(self):
        return Commity.objects.filter(pk=self.kwargs['pk'])




class GeneralAnalitics(APIView):
    permission_classes = [IsAuthenticated,IsTreasurer]
    # permission_classes = [AllowAny]
    def get(self, request):
        anotations  = dict(total_expense=Sum('amount', filter=Q(type="expense")) ,total_income=Sum('amount', filter=Q(type="income")) ,
                    total_records=Count('id'), count_loans_expense=Count('loan', filter=Q(type='expense')),
                    count_loans_income=Count('loan', filter=Q(type='income')),
                    count_financial_aids=Count('financial_aid', filter=Q(type='expense')),
                    total_expense_loans=Sum('amount', filter=Q(type="expense",loan__isnull=False)) ,
                    total_income_loans=Sum('amount', filter=Q(type="income",loan__isnull=False)) ,
                    total_expense_financial_aids=Sum('amount', filter=Q(type="expense",financial_aid__isnull=False)))
        financial_aid_by_type = dict(
            total_amount=Sum('amount', distinct=True),
            aid_type=F('financial_aid__financial_aid_type')
        )

        period_type = request.GET.get('period', "monthly")
        year = request.GET.get('year', date.today().year)
        week = request.GET.get('week',None)
        start_date = request.GET.get('start_date', "2022-01-01")
        end_date = request.GET.get('end_date', "2024-12-31")
        aids = True if request.GET.get('aids', False) == "true" else False
        total = True if request.GET.get('total', False) == "true" else False
        new_records = []
        if (aids):
            records = Record.objects.filter(created_at__year=year, type="expense", financial_aid__isnull=False)
            new_records = records.values('financial_aid__financial_aid_type').annotate(**financial_aid_by_type)
            serializer = RecordAnaliticsSerializer(new_records, many=True)
            return Response(serializer.data, status=200)
        if total:
            records = Record.objects.filter(created_at__year=year)
            new_records = records.aggregate(**anotations)
            serializer = RecordAnaliticsSerializer(new_records)
            return Response(serializer.data, status=200)
            
        elif start_date and end_date:
            try:
                if (period_type == "weekly"):
                    try:
                        week = int(week)
                    except ValueError:
                        return Response({"error": "la semaine doit être un nombre entier"}, status=400)
                    if (week == None or week < 1 or week > 53):
                        return Response({"error": "une semaine est requise pour une période hebdomadaire"}, status=400)
                    start_date = date.fromisocalendar(year, int(week), 1).strftime("%Y-%m-%d")
                    end_date = date.fromisocalendar(year, int(week), 7).strftime("%Y-%m-%d")
                    records = Record.objects.filter(created_at__range=[start_date, end_date]).order_by('-created_at')   
                    new_records = records.values('created_at__day').annotate(**anotations, created_at=F('created_at')).order_by('created_at__day')
                elif (period_type == "yearly"):
                    records = Record.objects.filter(created_at__range=[start_date, end_date])
                    new_records = records.values('created_at__year').annotate(**anotations).order_by('created_at__year')
                elif (period_type == "monthly"):
                    records = Record.objects.filter(created_at__year=year)
                    new_records = records.values('created_at__month').annotate(**anotations).order_by('created_at__month')
            except ValidationError:
                return Response({"error": "format de date invalide"}, status=400)
        serializer = RecordAnaliticsSerializer(new_records, many=True)
        return Response(serializer.data, status=200)


