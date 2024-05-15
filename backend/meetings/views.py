from rest_framework import generics
from rest_framework.response import Response
from .models import Meeting
from .serializers import MeetingSerializer
from .permissions import IsCommitte, CanCreateMeeting
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django_filters import rest_framework as filters


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

    # permission_classes = [IsAuthenticated, IsCommitte, CanCreateMeeting]
    queryset = Meeting.objects.filter(canceled=False).order_by("day")
    serializer_class = MeetingSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = MeetingFilter


class SingleMeetingView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, CanCreateMeeting]
    serializer_class = MeetingSerializer

    def get_queryset(self):
        return Meeting.objects.filter(pk=self.kwargs["pk"])
    def delete(self, request, *args, **kwargs):
        obj = self.get_object()
        obj.canceled = True
        obj.save()
        return Response({"success": "meeting has been deleted succesfuly."}, status=status.HTTP_200_OK)