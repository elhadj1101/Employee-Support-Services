from django.test import TestCase
from .models import Record
import random


# Create your tests here.
def createDummyRecords ():
    ll = ['expense','income']
    financial_lid = [14,15,16,17]
    loan_ids = [8,9,12]
    k = ['loan','financial_aid']
    dat = "2024-05-"
    for i in range(1,30):
        kk = random.choice(k)
        Record.objects.create(type=random.choice(ll),amount=random.randint(100,10000),
        loan_id=(None if kk !='loan' else random.choice(loan_ids)),
        financial_aid_id=(None if kk !='financial_aid' else random.choice(financial_lid)),
        motif="motif", created_at=dat+str(i))
        
        
createDummyRecords()