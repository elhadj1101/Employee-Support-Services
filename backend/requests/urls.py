from django.urls import path 
from .views import LoanView , UploadFileView , LoanHistoryView


urlpatterns = [
    path('',LoanView.as_view() ),
    path('history' , LoanHistoryView.as_view()),


    # just for testing UploadFileView
    path('file/',UploadFileView.as_view() ),
]