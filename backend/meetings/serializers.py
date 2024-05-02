from rest_framework import serializers
from .models import Meeting
from datetime import datetime, date
from django.utils.timezone import localtime
from django.db.models import Q


class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = "__all__"

    def validate(self, attrs):
        start_time = attrs["start_time"]
        end_time = attrs["end_time"]
        if start_time > end_time:
            raise serializers.ValidationError("End time must be after start time.")

        # checking if the meeting time is after the current time
        meeting_day = attrs["day"]
        now = datetime.now().time()
        day = date.today()

        if (
            day == meeting_day and (start_time < now or end_time < now)
        ) or meeting_day < day:
            raise serializers.ValidationError(
                "Meeting should be scheduled after current time."
            )

        # checking that this meeting does not overlap with an existing meeting
        same_day_meetings = Meeting.objects.filter(day=meeting_day)
        overlaped_meetings = same_day_meetings.filter(
            # using Q object to check for all extreme possibilities inside one single filter
            Q(start_time__gte=start_time, start_time__lte=end_time)
            | Q(end_time__gte=start_time, end_time__lte=end_time)
            | Q(start_time__lte=start_time, end_time__gte=end_time)
        )

        if overlaped_meetings:
            raise serializers.ValidationError(
                "Meeting time overlaps with and an existing meeting"
            )

        return super().validate(attrs)
