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
    loan_amount = models.CharField(max_length = 10 , null = False)
    loan_motivation = models.TextField(null = False)
    payment_method = models.TextField(null=False , choices = payment_method_options)
    loan_status = models.CharField(choices = status_options , max_length = 30  , null = False)
    start_loan_date = models.DateField(null = True)
    loan_period = models.CharField(max_length = 2 , null = False)



#Financial_aid
class Financial_aid(models.Model):
    financial_aid_type_options = [
        ('dece','dece') , 
        ('naissance_bebe','naissance d\'un bébé'),
        ('mariage','mariage') , 
    ]
    employee = models.ForeignKey(Employee , on_delete = models.CASCADE)
    request_created_at = models.DateField(auto_now_add = True)
    financial_aid_amount = models.CharField(max_length = 10)
    financial_aid_type = models.CharField(max_length = 255 , choices = financial_aid_type_options)




# Document
class Document(models.Model):
    employee = models.ForeignKey(Employee , on_delete = models.CASCADE )
    financial_aid = models.ForeignKey(Financial_aid , on_delete = models.CASCADE , null = True )
    document_name = models.CharField(max_length = 255)
    document_file = models.FileField(upload_to='%Y/%m/%d' )

    
    



   
    
