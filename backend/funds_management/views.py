from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .models import Record, Commity
from .serializers import RecordSerializer, CommitySerializer
from .permissions import IsTreasurer, CanViewCommity
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
