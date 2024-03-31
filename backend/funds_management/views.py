from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .models import ExpenceIncome
from .serializers import ExpenceIncomeSerializer
from .permissions import IsTreasurer
# Create your views here.

class CreateExpenceIncome(generics.CreateAPIView):
    queryset = ExpenceIncome.objects.all()
    serializer_class = ExpenceIncomeSerializer
    # permission_classes = [IsAuthenticated,IsTreasurer]

class ModifyExpenceIncome(generics.UpdateAPIView):
    queryset = ExpenceIncome.objects.all()
    serializer_class = ExpenceIncomeSerializer
    # permission_classes = [IsAuthenticated,IsTreasurer]