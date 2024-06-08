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
        subject = "Un nouveau offre a été ajouté !"
        message = f"""
Nous sommes ravis d'annoncer un nouvel avantage pour les employés qui vient de devenir disponible pour tous les membres de l'équipe.

En tant que membres précieux de notre équipe, nous cherchons constamment des moyens d'améliorer votre expérience ici à ESI-SBA. Nous sommes donc ravis de vous présenter notre dernière offre : {instance.title}.

{instance.title} est conçu pour {instance.description}.

Pour profiter de cette opportunité fantastique, il vous suffit de visiter notre site web.

Nous espérons que vous profiterez pleinement de ce nouvel avantage passionnant ! Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter.

Merci pour tout votre travail acharné et votre dévouement à ESI-SBA.

Cordialement,
"""

        employee_emails = list(Employee.objects.values_list("email", flat=True))
        send_mail(
            subject,
            message,
            EMAIL_HOST_USER,
            employee_emails,
            # [
            #     "pj0pj0pj000@gmail.com"
            #     # Because we don't have real  employee emails , I used this email to check ,
            #     # you can add your email here to check
            # ],
            fail_silently=False,
        )
