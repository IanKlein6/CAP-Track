from django.db import models 
from django.core.validators import RegexValidator 
from django.contrib.auth.models import User
from django.utils import timezone 
from datetime import datetime


class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


### Infastructure Models
phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Example: ...")

class ActiveObjectsManager(models.Manager):
    def get_queryset(self) -> models.QuerySet:
        return super().get_queryset().filter(deleted_at__isnull=True)
    
class SoftDeleteModel(models.Model):
    deleted_at = models.DateTimeField(null=True, blank=True)

    objects = models.Manager() # Default manager
    active_objects = ActiveObjectsManager() # Custom manager to filter out soft-delete records

    class Meta:
        abstract = True # stops creations of seperate table in database    
    
    def delete(self, *args, **kwargs):
        self.deleted_at = timezone.now()
        self.save()
    
    def hard_delete(self, *args, **kwargs):
        super(SoftDeleteModel, self).delete(*args, **kwargs)


### Normal Models 
class ConstructionManager(SoftDeleteModel):
    name = models.CharField(max_length=225)
    phone_number = models.CharField(validators=[phone_regex], max_length=13, blank=True)

    def __str__(self):
        return self.name

class JobSite(SoftDeleteModel):
    name = models.CharField(max_length=255)
    construction_manager = models.ForeignKey(ConstructionManager, on_delete=models.CASCADE)
    #hours total

    def __str__(self):
        return self.name

class WorkEntry(SoftDeleteModel): 
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()

    calendar_week = models.IntegerField(null=True, blank=True)
    calendar_year = models.IntegerField(null=True, blank=True)
    def save(self, *args, **kwargs):
        if self.date:
            year_week = self.date.isocalendar()
            self.calendar_year, self.calendar_week = year_week[0], year_week[1]
        super(WorkEntry, self).save(*args, **kwargs)
    
    job_site = models.ForeignKey(JobSite, on_delete=models.CASCADE)
    hours_worked = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.user.username} - {self.job_site.name} - {self.date} - {self.calendar_week} - {self.calendar_year}"


    