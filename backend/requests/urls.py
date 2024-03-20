from django.urls import path 
from .views import LoanView , UploadFileView , LoanHistoryView , FinancialaidView


urlpatterns = [
    path('loans',LoanView.as_view() ),
    path('loans/history' , LoanHistoryView.as_view()) ,
    path('financial-aid' , FinancialaidView.as_view() ),

    # just for testing UploadFileView
    path('file/',UploadFileView.as_view() ),
]