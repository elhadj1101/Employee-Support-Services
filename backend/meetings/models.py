from django.db import models
from django.db.models.signals import post_delete
from backend.utils import file_cleanup, get_path

# Create your models here.


class Meeting(models.Model):
    day = models.DateField(null=False)
    start_time = models.TimeField(null=False)
    end_time = models.TimeField(null=False)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    pv = models.FileField(upload_to=get_path, null=True)
    doc_field = "pv"


post_delete.connect(file_cleanup, sender=Meeting, dispatch_uid="meeting.file_cleanup")
