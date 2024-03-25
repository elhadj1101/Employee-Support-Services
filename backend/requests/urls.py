from django.urls import path 
from .views import LoanView , UploadFileView , LoanHistoryView , FinancialaidView , FinancialaidHistoryView , SaveDraft


urlpatterns = [
    path('loans/',LoanView.as_view() ),
    path('loans/history/' , LoanHistoryView.as_view()) ,
    path('financial-aids/' , FinancialaidView.as_view() ),
    path('financial-aids/history' , FinancialaidView.as_view() ),
    path('<str:request_type>/draft' ,SaveDraft.as_view()),

    # just for testing UploadFileView
    path('file/',UploadFileView.as_view() ),
]