from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics

from .models import Record
from .serializers import RecordSerializer
from .permissions import IsTreasurer
# Create your views here.

class CreateRecord(generics.ListCreateAPIView):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    permission_classes = [AllowAny]
    # permission_classes = [IsAuthenticated,IsTreasurer]

class ModifyRecord(generics.UpdateAPIView):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    permission_classes = [AllowAny]
    # permission_classes = [IsAuthenticated,IsTreasurer]

class ListRecord(generics.ListAPIView):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    # permission_classes = [IsAuthenticated,IsTreasurer]

class DeleteRecord(generics.RetrieveDestroyAPIView):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    permission_classes = [AllowAny]
    # permission_classes = [IsAuthenticated,IsTreasurer]   