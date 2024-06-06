from rest_framework import generics
from rest_framework.response import Response
from .models import Meeting
from .serializers import MeetingSerializer
from .permissions import IsCommitte, CanCreateMeeting
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django_filters import rest_framework as filters
import os
from django.core.files.storage import default_storage

# Create your views here.


class MeetingFilter(filters.FilterSet):
    title = filters.CharFilter(lookup_expr="icontains")
    description = filters.CharFilter(lookup_expr="icontains")

    class Meta:
        model = Meeting
        fields = {
            "day": ["exact", "gte", "lte", "lt", "gt"],
            "title": ["exact"],
            "description": ["exact"],
        }


class MeetingsView(generics.ListCreateAPIView):

    permission_classes = [IsAuthenticated, IsCommitte, CanCreateMeeting]
    queryset = Meeting.objects.filter(canceled=False).order_by("day")
    serializer_class = MeetingSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = MeetingFilter


class SingleMeetingView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, CanCreateMeeting]
    serializer_class = MeetingSerializer

    def get_queryset(self):
        return Meeting.objects.filter(pk=self.kwargs["pk"])
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data.copy()
        if type(data.get('pv')) == str:
            data.pop('pv')
        else:
            old_file = instance.pv.path
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
    def delete(self, request, *args, **kwargs):
        obj = self.get_object()
        obj.canceled = True
        obj.save()
        return Response(
            {"success": "la réunion a été supprimée avec succès."},
            status=status.HTTP_200_OK,
        )
