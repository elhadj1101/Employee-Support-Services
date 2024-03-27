from django.db import models
from authentication.models import Employee
from datetime import timedelta
from django.db.models.signals import post_delete
from backend.utils import file_cleanup
# Create your models here.

#Loan
class Loan(models.Model):
    status_options = [
        ('draft' , 'brouillon'),
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
    loan_amount = models.FloatField(null = False)
    payment_method = models.TextField(null=False , choices = payment_method_options)
    loan_motivation = models.TextField(null = False)
    start_loan_date = models.DateField(null = True, blank=True)
    loan_period = models.IntegerField( null = False)
    loan_status = models.CharField(choices = status_options , max_length = 30  , null = False)


#Financial_aid
class Financial_aid(models.Model):
    financial_aid_type_options = [
        ('family_member_death', 'décès d\'un membre de famille'), 
        ('employee_death', 'décès d\'un employé'),
        ('child_birth', 'naissance d\'un fils'),
        ('mariage', 'mariage'), 
        ('circumcision_newborn' , 'Circoncision d\'un nouveau-né'),
        ('retirement_financial_aid','Aide financière à la retraite'),
        ('surgeries' ,'les opérations chirurgicales'),
        ('mineral_baths','Bains minéraux'),
        ('accident_and_disasters','Assistance en cas d\'accident Et les catastrophes'),
        ('social_and_health_aid','Aide aux conditions sociales et sanitaires'),
    ]
    financial_aid_status_options = [
        ('draft' , 'brouillon'),
        ('waiting', 'en attente'),
        ('refused', 'refusé'),
        ('approved', 'approuvé')
    ]
    family_member_options = [
        ('wife', 'epouse') , 
        ('son', 'fils'),
        ('parent' , 'parent'), 
    ]

    # documents_to_upload_field
    employee = models.ForeignKey(Employee , on_delete = models.CASCADE)
    request_created_at = models.DateField(auto_now_add = True )
    financial_aid_type = models.CharField(max_length = 50 , choices = financial_aid_type_options)
    family_member =  models.CharField(max_length = 50   , choices = family_member_options , null = True, blank = True)
    financial_aid_status = models.CharField(max_length = 50  , choices = financial_aid_status_options ) 
    request_response_at = models.DateField(null =True, blank=True)

# Document
class Document(models.Model):
    def get_path(instance, filename):
        extension = filename.split('.')[-1]
        name = filename.split('.')[0]
            
        import os, random, string
        length = 13
        chars = string.ascii_letters + string.digits + '!@#$%^&*()'
        random.seed = (os.urandom(1024))
        a = ''.join(random.choice(chars) for i in range(length))
        rndm_filename = '%s%s%s' % (name,str(a),extension)
        return f'{instance.employee.pk}/docs/{rndm_filename}'
        
    employee = models.ForeignKey(Employee , on_delete = models.CASCADE )
    financial_aid = models.ForeignKey(Financial_aid , on_delete = models.CASCADE, related_name='documents')
    document_name = models.CharField(max_length = 255)
    random_name = models.CharField(max_length = 255)
    document_file = models.FileField(upload_to=get_path )
    document_uploaded_at = models.DateField(auto_now_add = True)
    
    # for postDelete signal
    doc_field = "document_file"
    
    
    def __str__(self) -> str:
        return self.document_name + str(self.employee.pk)
    
post_delete.connect(
    file_cleanup, sender=Document, dispatch_uid="document.file_cleanup"
)