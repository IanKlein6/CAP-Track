from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


#class Job(models.Model):

# Soft Delete Manager 
class ActiveWorkEntryManager(models.Manager):
    def get_queryset(self):
        # Use the timestamp to filter for non-deleted entries
        return super().get_queryset().filter(deleted_at__isnull=True)
    
class WorkEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    

    # Flag softdelete timestamp
    deleted_at = models.DateTimeField(null=True, blank=True) # Time flag for soft delete
    # Manager
    objects = models.Manager() # Default Manager
    active = ActiveWorkEntryManager() # Custom manager for active entries


    # Override delete method
    def delete(self, *args, **kwargs):
        # Timestamp
        self.deleted_at = timezone.now()
        self.save()
                            
    # Use WorkEntry.active.all() to get only the entries that arnet' soft-deleted.