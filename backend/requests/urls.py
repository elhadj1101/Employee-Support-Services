from django.urls import path
from .views import (
    LoanView,
    UploadFileView,
    LoanHistoryView,
    FinancialaidView,
    FinancialaidHistoryView,
    LoanCheckView,
    FinancialaidCheckView,
)


urlpatterns = [
    path("loans/", LoanView.as_view()),
    path("loans/history/", LoanHistoryView.as_view()),
    path("loans/check", LoanCheckView.as_view()),
    path("financial-aids/", FinancialaidView.as_view()),
    path("financial-aids/history/", FinancialaidHistoryView.as_view()),
    path("financial-aids/check", FinancialaidCheckView.as_view()),
    # just for testing UploadFileView
    path("file/", UploadFileView.as_view()),
]
