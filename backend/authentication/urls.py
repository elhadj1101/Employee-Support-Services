from django.urls import path
from .views import CreateUserView, SignupView, UserDetailsView,UserDataView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# this url is just for testing the add user endpoint 

urlpatterns = [
    path('users/' , CreateUserView.as_view() ),
    path('users/<int:pk>/' , UserDetailsView.as_view()),
    path('users/<int:pk>/activate' , UserDetailsView.as_view()),
    
    path('user/' , UserDataView.as_view()),
    path('signup/' , SignupView.as_view() ),
    # endpoints for the tokens
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token-refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]