from django.db import models
from authentication.models import Employee
from datetime import timedelta
# Create your models here.

#Loan
class Loan(models.Model):
    status_options = [
        ('waiting', 'En attente'),
        ('refused', 'Rejeté'),
        ('approved', 'Approuvé'),
        ('finished' , 'terminé')
    ]
    payment_method_options = [
        ('ccp','ccp') , 
        ('banque','banque'),
    ]

    employee = models.ForeignKey(Employee , on_delete = models.CASCADE   )
    request_created_at = models.DateField(auto_now_add = True)
    loan_amount = models.CharField(max_length = 10 , null = False)
    payment_method = models.TextField(null=False , choices = payment_method_options)
    loan_motivation = models.TextField(null = False)
    start_loan_date = models.DateField(null = True)
    loan_period = models.CharField(max_length = 2 , null = False)
    loan_status = models.CharField(choices = status_options , max_length = 30  , null = False)


#Financial_aid
class Financial_aid(models.Model):
    financial_aid_type_options = [
        ('family_member_death', 'décès d\'un membre de famille'), 
        ('employee_death', 'décès d\'un employé'),
        ('child_birth', 'naissance d\'un fils'),
        ('mariage', 'mariage'), 
    ]
    financial_aid_status_options = [
        ('waiting', 'en attente'),
        ('refused', 'refusé'),
        ('approved', 'approuvé')
    ]
    family_member_death_options = [
        ('wife', 'spouse') , 
        ('son', 'fils'),
        ('parent' , 'parent'), 
        ('brother' ,'frère')
    ]


    employee = models.ForeignKey(Employee , on_delete = models.CASCADE)
    request_created_at = models.DateField(auto_now_add = True )
    financial_aid_type = models.CharField(max_length = 255 , choices = financial_aid_type_options)
    family_member_death = models.CharField(max_length = 50 , null = True )
    financial_aid_amount = models.CharField(max_length = 10)
    financial_aid_status = models.CharField(max_length = 50  , choices = financial_aid_status_options ) 
    request_response_at = models.DateField()

# Document
class Document(models.Model):

    employee = models.ForeignKey(Employee , on_delete = models.CASCADE )
    financial_aid = models.ForeignKey(Financial_aid , on_delete = models.CASCADE   )
    document_name = models.CharField(max_length = 255)
    document_file = models.FileField(upload_to='docs/%Y/%m/%d' )
   
    