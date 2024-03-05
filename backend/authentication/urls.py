from django.urls import path
from .views import CreateUserView

# this url is just for testing the add user endpoint 

urlpatterns = [
    path('user/' , CreateUserView.as_view() ),
    
]