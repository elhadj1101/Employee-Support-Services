from django.test import TestCase
from .models import Record
import random


# Create your tests here.
def createDummyRecords ():
    ll = ['expense','income']
    financial_lid = [14,15,16,17]
    loan_ids = [8,9,10]
    k = ['loan','financial_aid']
    for i in range(1000):
        kk = random.choice(k)
        Record.objects.create(type=random.choice(ll),amount=random.randint(100,10000),loan_id=(None if kk !='loan' else random.choice(loan_ids)),financial_aid_id=(None if kk !='financial_aid' else random.choice(financial_lid)),motif="motif")
        
        
createDummyRecords()