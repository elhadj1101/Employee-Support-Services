from rest_framework.permissions import IsAuthenticated
from rest_framework import generics , status
from rest_framework.response import Response
from .models import  Offre
from .permissions import CanPublishOffre
from .serializers import OffresSerializer
# Create your views here.



class OffreView(generics.ListCreateAPIView):
    queryset = Offre.objects.all()
    serializer_class = OffresSerializer
    permission_classes = [IsAuthenticated, CanPublishOffre]
    
class OffreDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Offre.objects.all()
    serializer_class = OffresSerializer    
    permission_classes = [IsAuthenticated, CanPublishOffre]

    