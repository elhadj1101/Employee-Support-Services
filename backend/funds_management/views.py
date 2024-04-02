from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics

from .models import ExpenceIncome
from .serializers import ExpenseIncomeSerializer
from .permissions import IsTreasurer
# Create your views here.

class CreateExpenceIncome(generics.ListCreateAPIView):
    queryset = ExpenceIncome.objects.all()
    serializer_class = ExpenseIncomeSerializer
    permission_classes = [AllowAny]
    # permission_classes = [IsAuthenticated,IsTreasurer]

class ModifyExpenceIncome(generics.UpdateAPIView):
    queryset = ExpenceIncome.objects.all()
    serializer_class = ExpenseIncomeSerializer
    permission_classes = [AllowAny]
    # permission_classes = [IsAuthenticated,IsTreasurer]

class ListExpensesAndIncome(generics.ListAPIView):
    queryset = ExpenceIncome.objects.all()
    serializer_class = ExpenseIncomeSerializer
    # permission_classes = [IsAuthenticated,IsTreasurer]

class DeleteExpensesAndIncome(generics.DestroyAPIView):
    queryset = ExpenceIncome.objects.all()
    serializer_class = ExpenseIncomeSerializer
    permission_classes = [AllowAny]
    # permission_classes = [IsAuthenticated,IsTreasurer]   