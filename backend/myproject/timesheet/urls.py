from django.urls import path, include
from django.contrib import admin  # Ensure this import is correct for admin
from rest_framework.routers import DefaultRouter
from .views import JobSiteViewSet, WorkEntryViewSet, total_hours_for_week, home, total_hours_per_job_site

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'jobsites', JobSiteViewSet)
router.register(r'workentries', WorkEntryViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
   # path('api/', include(router.urls)),  # Corrected to include router URLs under 'api/' prefix
    path('admin/', admin.site.urls),
    path('', home, name='home'),  # Assuming 'home' is a view you defined in views.py
    path('week/', total_hours_for_week, name='total_hours_for_week'),  # Assuming this is a view in views.py
    path('jobsite-hours/', total_hours_per_job_site, name='total_hours_per_job_site'),  # Assuming this is also a view
]
