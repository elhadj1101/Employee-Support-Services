from rest_framework import serializers
from .models import Meeting
from datetime import datetime, date
from django.utils.timezone import localtime


class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = "__all__"

    def validate(self, attrs):
        start_time = attrs["start_time"]
        end_time = attrs["end_time"]
        if start_time > end_time:
            raise serializers.ValidationError("End time must be after start time.")
        meeting_day = attrs["day"]
        now = datetime.now().time()
        day = date.today()
        print(f"this start/end time {start_time , end_time} and this is now time {now}")
        if (
            day == meeting_day and (start_time < now or end_time < now)
        ) or meeting_day < day:
            raise serializers.ValidationError(
                "Meeting should be scheduled after current time."
            )

        return super().validate(attrs)
