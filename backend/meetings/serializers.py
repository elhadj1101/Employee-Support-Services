from rest_framework import serializers
from .models import Meeting


class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = "__all__"

    def validate(self, attrs):
        start_time = attrs["start_time"]
        end_time = attrs["end_time"]

        if start_time > end_time:
            raise serializers.ValidationError("End date must be after start date.")
        return super().validate(attrs)
