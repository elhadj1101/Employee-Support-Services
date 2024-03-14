from django.urls import path
from .views import CreateUserView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# this url is just for testing the add user endpoint 

urlpatterns = [
    path('user/' , CreateUserView.as_view() ),
    
    # endpoints for the tokens
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]