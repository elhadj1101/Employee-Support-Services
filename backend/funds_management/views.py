from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from .models import Record, Commity
from datetime import date
from .serializers import RecordSerializer, CommitySerializer, RecordAnaliticsSerializer
from .permissions import IsTreasurer, CanViewCommity
from django.core.exceptions import ValidationError
from django.db.models import Sum, Count, Q
# Create your views here.
class RecordView(generics.ListCreateAPIView):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    # permission_classes = [AllowAny]
    permission_classes = [IsAuthenticated,IsTreasurer]

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