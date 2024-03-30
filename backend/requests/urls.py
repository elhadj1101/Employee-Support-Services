from django.urls import path
from .views import (
    LoanView,
    LoanHistoryView,
    FinancialaidView,
    FinancialaidHistoryView,
    LoanCheckView,
    FinancialaidCheckView,
    UpdateRequestView,
    UpdateRequestStatusView

)


urlpatterns = [
    path("loans/", LoanView.as_view()),
    path("loans/history/", LoanHistoryView.as_view()),
    path("loans/check/", LoanCheckView.as_view()),
    # for the update view loan/financial-aid
    path('<str:request_type>/<int:pk>' ,UpdateRequestView.as_view() ),
    path('commite/<str:request_type>/<int:pk>' , UpdateRequestStatusView.as_view()),

    path("financial-aids/", FinancialaidView.as_view()),
    path("financial-aids/history/", FinancialaidHistoryView.as_view()),
    path("financial-aids/check", FinancialaidCheckView.as_view()),


    
]
