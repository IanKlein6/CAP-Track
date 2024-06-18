from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet, LoginView, LogoutView, UserCreate, UserListView, get_item_by_name
from django.contrib import admin

# Setup the router for ItemViewSet
router = DefaultRouter()
router.register(r'items', ItemViewSet)

# Define URL patterns for the API
urlpatterns = [ 
    path('test/', include(router.urls)),
    path('signup/', UserCreate.as_view(), name='signup'), 
    path('users/', UserListView.as_view(), name='users'), 
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('items/name/', get_item_by_name, name='get_item_by_name'),
]
