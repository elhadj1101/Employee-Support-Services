from django.db import models
from django.urls import reverse
from django.db.models.signals import post_delete, post_save
from backend.utils import file_cleanup

from django.dispatch import receiver
from django.core.mail import send_mail
from backend.settings import EMAIL_HOST_USER
from authentication.models import Employee


class Offre(models.Model):
    published_at = models.DateField(auto_now_add=True)
    title = models.CharField(max_length=35)
    # slug = models.SlugField(unique = True)
    description = models.TextField()
    max_participants = models.IntegerField()
    start_date = models.DateField()
    end_date = models.DateField()
    cover = models.ImageField(upload_to="%Y/%m/%d")
    doc_field = "cover"

    # def save(self, *args, **kwargs):
    #     if self.slug == "":
    #         strtime = "".join(str(time()).split("."))
    #         string = "%s-%s" % ( self.title.lower(),strtime[7:])
    #         self.slug = slugify(string)
    #     super(Offre, self).save(*args, **kwargs)
    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("offre_detail", kwargs={"pk": self.pk})


post_delete.connect(file_cleanup, sender=Offre, dispatch_uid="offre.file_cleanup")


@receiver(post_save, sender=Offre)
def new_offre(sender, instance, created, **kwargs):
    if created:
        subject = "Exciting new employee offer alert! 🚀🎉"
        message = f"""
We are excited to announce a new employee benefit that has just become available to all team members.

As valued members of our team, we are constantly looking for ways to enhance your experience here at ESI-SBA. We are thrilled to introduce our latest offering: {instance.title}.

{instance.title} is designed to {instance.descritpion}.

To take advantage of this fantastic opportunity, simply visit our website.

We hope you will make the most of this exciting new benefit! If you have any questions or need assistance, please don't hesitate to reach out to us.

Thank you for all your hard work and dedication to [Your Company Name].

Best regards,
"""
        employee_emails = list(Employee.objects.values_list("email", flat=True))
        send_mail(
            subject,
            message,
            EMAIL_HOST_USER,
            # employee_emails
            [
                "pj0pj0pj000@gmail.com"
                # Because we don't have real  employee emails , I used this email to check ,
                # you can add your email here to check
            ],
            fail_silently=False,
        )
