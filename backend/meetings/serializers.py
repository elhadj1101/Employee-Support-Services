from rest_framework import serializers
from .models import Meeting
from datetime import datetime, date
from django.utils.timezone import localtime
from django.db.models import Q


class MeetingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Meeting
        fields = [
            "id",
            "day",
            "start_time",
            "end_time",
            "title",
            "description",
            "link",
            "pv",
            "canceled",
        ]

    def validate(self, attrs):

        start_time = attrs.get("start_time")
        end_time = attrs.get("end_time")
        if (start_time and not end_time) or (not start_time and end_time):
            raise serializers.ValidationError(
                {"start_time": "L’heure de fin et l’heure de début doivent changer en même temps."}
            )
        if start_time and end_time and start_time > end_time:
            raise serializers.ValidationError({"start_time": "L'heure de fin doit être postérieure à l'heure de début."})

        # checking if the meeting time is after the current time
        meeting_day = attrs.get("day")
        now = datetime.now().time()
        day = date.today()

        instance = getattr(self, "instance", None)
        if instance and (not start_time and not end_time):
            start_time = instance.start_time
            end_time = instance.end_time

        if (
            meeting_day and day == meeting_day and (start_time < now or end_time < now)
        ) or (meeting_day and meeting_day < day):
            raise serializers.ValidationError(
                {"meeting_day": "La réunion doit être programmée après l’heure actuelle."}
            )

        # checking that this meeting does not overlap with an existing meeting
        if instance and not meeting_day:
            meeting_day = instance.day
        same_day_meetings = Meeting.objects.filter(day=meeting_day)
        overlaped_meetings = same_day_meetings.filter(
            # using Q object to check for all extreme possibilities inside one single filter
            Q(start_time__gte=start_time, start_time__lt=end_time)
            | Q(end_time__gt=start_time, end_time__lte=end_time)
            | Q(start_time__lte=start_time, end_time__gte=end_time)
        )

        if instance:
            overlaped_meetings = overlaped_meetings.exclude(pk=instance.pk)
        if overlaped_meetings:
            raise serializers.ValidationError(
                {"overlap": "L’heure de la réunion chevauche une réunion existante"}
            )

        return super().validate(attrs)
