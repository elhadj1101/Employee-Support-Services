from django.db import models
from django.db.models.signals import post_delete
from backend.utils import file_cleanup, get_path


# Create your models here.


class Meeting(models.Model):
    time = models.DateTimeField(null=False)
    period = models.DurationField(null=False)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    pv = models.FileField(upload_to=get_path, null=True)


post_delete.connect(file_cleanup, sender=Meeting, dispatch_uid="meeting.file_cleanup")
