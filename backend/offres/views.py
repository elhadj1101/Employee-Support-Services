from rest_framework.permissions import IsAuthenticated
from rest_framework import generics , status
from rest_framework.response import Response
from .models import  Offre
from .permissions import CanPublishOffre
import os
from django.core.files.storage import default_storage

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
    def update(self, request, *args, **kwargs):
        
        instance = self.get_object()
        
        data = request.data.copy()
        if type(data.get('cover')) == str:
            data.pop('cover')
        else:
            old_file = instance.cover.path
            if (os.path.exists(old_file)):
                default_storage.delete(old_file)
        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
    