from django.shortcuts import render
from django.db.models import Sum
from rest_framework import viewsets
from .models import Item
from .serializers import ItemSerializer

import logging
#WorkEntry



class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


logger = logging.getLogger(__name__)

# In your Django view function for fetching by ID
def get_item(request, item_id):
    logger.info(f'Fetching item with ID {item_id}')
    # Fetch and return the item...

# In your Django view function for deletion
def delete_item(request, item_id):
    logger.info(f'Deleting item with ID {item_id}')
    # Delete the item...



# def total_hours_per_job_site(year, week):
#     totals = WorkEntry.objects.filter(
#         calendar_year=year,
#         calendar_week=week,
#         deleted_at__isnull=True  # Considering only active (not soft-deleted) entries
#     ).values(
#         'job_site__name'  # Group by job site name
#     ).annotate(
#         total_hours=Sum('hours_worked')  # Sum hours worked per group
#     )
#     return totals

# def total_hours_for_week(year, week):
#     total = WorkEntry.objects.filter(
#         calendar_year=year,
#         calendar_week=week,
#         deleted_at__isnull=True
#     ).aggregate(
#         total_hours=Sum('hours_worked')  # Sum hours worked across all entries
#     )
#     return total['total_hours']

# Create your views here.
