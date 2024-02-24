from django.urls import path, include
from django.contrib import admin  # Ensure this import is correct for admin
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet 


# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'items', ItemViewSet)


# The API URLs are now determined automatically by the router.
urlpatterns = [ 
    path('', include(router.urls)),
    
    
    
    
    #path('home/', home, name='home'),  # Assuming 'home' is a view you defined in views.py
    #path('admin/', admin.site.urls),
 


    #path('api/', include(router.urls)),  # Corrected to include router URLs under 'api/' prefix
    #path('totalweek/', total_hours_for_week, name='totalweek'),  # Assuming this is a view in views.py
]
