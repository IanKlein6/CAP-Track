from django.urls import path, include
from rest_framework.routers import DefaultRouter
from views import JobSiteViewSet, WorkEntryViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'jobsites', JobSiteViewSet)
router.register(r'workentries', WorkEntryViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]
