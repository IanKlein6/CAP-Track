from django.urls import path, include
from django.contrib import admin  # Ensure this import is correct for admin
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet, LoginView
from .views import UserCreate, UserSerializer


# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'items', ItemViewSet)


# The API URLs are now determined automatically by the router.
urlpatterns = [ 
    path('', include(router.urls)),

    path('register/', UserCreate.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    
]
