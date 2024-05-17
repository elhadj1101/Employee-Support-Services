from django.db import models
from django.db.models.signals import post_delete, post_save
from backend.utils import file_cleanup, get_path
from django.core.validators import FileExtensionValidator

from django.dispatch import receiver
from django.core.mail import send_mail
from backend.settings import EMAIL_HOST_USER
from authentication.models import Employee

# Create your models here.
extention_validator = FileExtensionValidator(["pdf", "jpg", "png"])


class Meeting(models.Model):
    canceled = models.BooleanField(default=False)
    day = models.DateField(null=False)
    start_time = models.TimeField(null=False)
    end_time = models.TimeField(null=False)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    link = models.CharField(max_length=255, null=True, blank=True)
    pv = models.FileField(
        upload_to=get_path, null=True, validators=[extention_validator], blank=True
    )
    doc_field = "pv"

    def __init__(self, *args: post_save, **kwargs: post_save) -> None:
        super().__init__(*args, **kwargs)
        self.cached_start_time = self.start_time
        self.cached_end_time = self.end_time
        self.cached_day = self.day

    def __str__(self) -> str:
        return f"{self.title} on {self.day} from {self.start_time} to {self.end_time}"


post_delete.connect(file_cleanup, sender=Meeting, dispatch_uid="meeting.file_cleanup")


@receiver(post_save, sender=Meeting)
def post_save(sender, instance, created, **kwargs):
    # only update instance
    if not created:

        if (
            instance.start_time != instance.cached_start_time
            or instance.end_time != instance.cached_end_time
            or instance.day != instance.cached_day
        ):
            subject = "Change in Meeting Time"
            message = f"""
Dear Committee Member,

I hope this email finds you well. I am writing to inform you that the meeting time for {instance.day} has been changed. Please find the updated details below:

Previous Date and Time: {instance.cached_day} {instance.cached_start_time} to {instance.cached_end_time}
New Date and Time: {instance.day} {instance.start_time} to {instance.end_time}
                        """
            committe_roles = ["president", "vice_president", "tresorier", "membre"]
            committe_emails = Employee.objects.filter(
                role__in=committe_roles
            ).values_list("email", flat=True)
            committe_emails = list(committe_emails)
            try:
                send_mail(
                    subject,
                    message,
                    EMAIL_HOST_USER,
                    # committe_emails,
                    [
                        "pj0pj0pj000@gmail.com"
                        # Because we don't have real committe emails , I used this email to check ,
                        # you can add your email here to check
                    ],
                    fail_silently=False,
                )
            except:
                pass
