from typing import Any
from django.db import models
from authentication.models import Employee
from django.db.models.signals import post_delete, post_save
from backend.utils import file_cleanup, get_path

from django.dispatch import receiver
from django.core.mail import send_mail
from backend.settings import EMAIL_HOST_USER
from authentication.models import Employee

# Create your models here.


# Loan
class Loan(models.Model):
    status_options = [
        ("brouillon", "brouillon"),
        ("waiting", "En attente"),
        ("refused", "Rejeté"),
        ("approved", "Approuvé"),
        ("payment_started", "En cours de paiement"),
        ("finished", "terminé"),
    ]
    payment_method_options = [
        ("ccp", "ccp"),
        ("banque", "banque"),
    ]

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    request_created_at = models.DateField(null=True)
    amount = models.DecimalField(max_digits=50, decimal_places=2, null=False)
    payment_method = models.TextField(null=False, choices=payment_method_options)
    loan_motivation = models.TextField(null=False)
    request_response_at = models.DateField(null=True, blank=True)
    loan_period = models.IntegerField(null=False)
    loan_status = models.CharField(choices=status_options, max_length=30, null=False)
    paid_amount = models.DecimalField(max_digits=50, decimal_places=2, default=0)

    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        self.cached_status = self.loan_status


# Financial_aid
class Financial_aid(models.Model):
    financial_aid_type_options = [
        ("family_member_death", "décès d'un membre de famille"),
        ("employee_death", "décès d'un employé"),
        ("child_birth", "naissance d'un fils"),
        ("mariage", "mariage"),
        ("circumcision_newborn", "Circoncision d'un nouveau-né"),
        ("retirement_financial_aid", "Aide financière à la retraite"),
        ("surgeries", "les opérations chirurgicales"),
        ("mineral_baths", "Bains minéraux"),
        ("accident_and_disasters", "Assistance en cas d'accident Et les catastrophes"),
        ("social_and_health_aid", "Aide aux conditions sociales et sanitaires"),
    ]
    financial_aid_status_options = [
        ("brouillon", "brouillon"),
        ("waiting", "en attente"),
        ("refused", "refusé"),
        ("approved", "approuvé"),
        ("finished", "terminé"),
    ]
    family_member_options = [
        ("wife", "epouse"),
        ("son", "fils"),
        ("parent", "parent"),
    ]

    # documents_to_upload_field
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    request_created_at = models.DateField(null=True)
    financial_aid_type = models.CharField(
        max_length=50, choices=financial_aid_type_options
    )
    family_member = models.CharField(
        max_length=50, choices=family_member_options, null=True, blank=True
    )
    financial_aid_status = models.CharField(
        max_length=50, choices=financial_aid_status_options
    )
    request_response_at = models.DateField(null=True, blank=True)
    amount = models.DecimalField(
        max_digits=50, decimal_places=2, null=True, blank=True, default=0
    )

    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        self.cached_status = self.financial_aid_status


# Document
class Document(models.Model):

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    loan = models.ForeignKey(
        Loan, on_delete=models.CASCADE, null=True, related_name="documents"
    )
    financial_aid = models.ForeignKey(
        Financial_aid, on_delete=models.CASCADE, related_name="documents", null=True
    )
    document_name = models.CharField(max_length=255)
    document_file = models.FileField(upload_to=get_path)
    document_uploaded_at = models.DateField(auto_now_add=True)
    document_size = models.FloatField(default=10.05)
    # for postDelete signal
    doc_field = "document_file"

    def __str__(self) -> str:
        return self.document_name + str(self.employee.pk)


post_delete.connect(file_cleanup, sender=Document, dispatch_uid="document.file_cleanup")


@receiver(post_save, sender=Loan)
def post_save_loan(sender, instance, created, **kwargs):
    # only update instance
    if not created:
        if (
            instance.cached_status != instance.loan_status
            and instance.cached_status == "draft"
        ):
            instance.cached_status = instance.loan_status
        else:
            subject = "Le statut de votre prêt a été mis à jour !"
            message = f"""
Cher/Chère {instance.employee.first_name},

Nous espérons que ce courriel vous trouve bien.

Nous souhaitions vous informer qu'il y a eu un changement dans le statut de votre prêt. Voici les détails du changement :

Statut précédent : {instance.cached_status}
Nouveau statut : {instance.loan_status}

Si vous avez des questions ou besoin de plus de précisions concernant ce changement, n'hésitez pas à nous contacter.

Merci de votre attention à cette affaire.

Cordialement,
"""
            employee_email = instance.employee.email
            try:
                send_mail(
                    subject,
                    message,
                    EMAIL_HOST_USER,
                    [
                        employee_email ,
                        #"pj0pj0pj000@gmail.com"
                        # Because we don't have real committe emails , I used this email to check ,
                        # you can add your email here to check
                    ],
                    fail_silently=False,
                )
            except:
                pass


@receiver(post_save, sender=Financial_aid)
def post_save_financial_aid(sender, instance, created, **kwargs):
    # only update instance
    if not created:
        if (
            instance.cached_status != instance.financial_aid_status
            and instance.cached_status == "draft"
        ):
            instance.cached_status = instance.financial_aid_status
        else:

            subject = "Le statut de votre aide financière a été mis à jour !"
            message = f"""
Cher/Chère {instance.employee.first_name},

Nous espérons que ce courriel vous trouve bien.

Nous souhaitions vous informer qu'il y a eu un changement dans le statut de votre prêt. Voici les détails du changement :

Statut précédent : {instance.cached_status}
Nouveau statut : {instance.financial_aid_status}

Si vous avez des questions ou besoin de plus de précisions concernant ce changement, n'hésitez pas à nous contacter.

Merci de votre attention à cette affaire.

Cordialement,
"""


            try:
                employee_email = instance.employee.email
                send_mail(
                    subject,
                    message,
                    EMAIL_HOST_USER,
                    [  employee_email ,
                       # "pj0pj0pj000@gmail.com"
                        # Because we don't have real committe emails , I used this email to check ,
                        # you can add your email here to check
                    ],
                    fail_silently=False,
                )
            except:
                pass
