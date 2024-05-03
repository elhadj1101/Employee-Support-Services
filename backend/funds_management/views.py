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
from django.db.models import Sum, Count, Q


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
            if loan.loan_status != "approved":
                raise ValidationError("you can't pay an unapproved loan broo ?!")
            if loan.paid_amount + serializer.validated_data.get('amount') > loan.amount:
                raise ValidationError("you can't pay more than the loan amount")
            loan.paid_amount += serializer.validated_data.get('amount')
            loan.save()
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class SingleRecordView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RecordSerializer
    # permission_classes = [AllowAny]
    permission_classes = [IsAuthenticated,IsTreasurer]
    def get_queryset(self):
        return Record.objects.filter(pk=self.kwargs['pk'])

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




class RecordsAnalitics(APIView):
    def get(self, request):
        anotations  = dict(total_expense=Sum('amount', filter=Q(type="expense")) ,total_income=Sum('amount', filter=Q(type="income")) ,
                    total_records=Count('id'), count_loans_expense=Count('loan', filter=Q(type='expense')),
                    count_loans_income=Count('loan', filter=Q(type='income')),
                    count_financial_aids=Count('financial_aid', filter=Q(type='expense')),
                    total_expense_loans=Sum('amount', filter=Q(type="expense",loan__isnull=False)) ,
                    total_income_loans=Sum('amount', filter=Q(type="income",loan__isnull=False)) ,
                    total_expense_financial_aids=Sum('amount', filter=Q(type="expense",financial_aid__isnull=False)))


        period_type = request.GET.get('period_type', "monthly")
        year = request.GET.get('year', date.today().year)
        start_date = request.GET.get('start_date', "2022-01-01")
        end_date = request.GET.get('end_date', "2024-12-31")
        limit =  request.GET.get('limit', 100)
        if start_date and end_date:
            try:
                if (period_type == "weekly"):
                    records = Record.objects.filter(created_at__range=[start_date, end_date])
                    new_records = records.values('created_at').annotate(**anotations).order_by('created_at')
                elif (period_type == "yearly"):
                    records = Record.objects.filter(created_at__range=[start_date, end_date])
                    new_records = records.values('created_at__year').annotate(**anotations).order_by('created_at__year')
                elif (period_type == "monthly"):
                    records = Record.objects.filter(created_at__year=year)
                    new_records = records.values('created_at__month').annotate(**anotations).order_by('created_at__month')
            except ValidationError:
                return Response({"error": "invalid date format"}, status=400)
        serializer = RecordAnaliticsSerializer(new_records, many=True)
        return Response(serializer.data, status=200)