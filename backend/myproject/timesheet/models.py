from django.db import models 
from django.core.validators import RegexValidator 
from django.contrib.auth.models import User
from django.utils import timezone 
from datetime import datetime
import logging

# User Authentication
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Logger setup
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Invitation Code model for managing invitation codes
class InvitationCode(models.Model):
    code = models.CharField(max_length=100, unique=True)
    is_used = models.BooleanField(default=False)

    def __str__(self):
        return self.code

class CustomUserManager(BaseUserManager):
    print("models custom manager 1")
    use_in_migrations = True
    def _create_user(self, email, password, **extra_fields):
        print("models custom manager 2")
        if not email:
            print("models custom manager 3")
            raise ValueError('The Email must be set')
        print("models custom manager 4")
        email = self.normalize_email(email)
        print(f"models custom manager 5 email form self nomalized email {email}")
        user = self.model(email=email, **extra_fields)
        print(f"models custom manager 6 user from model email email {user}")
        print(f"models custom manager 7 before set_ {password}, {user}")
        user.set_password(password)
        print(f"models custom manager 8 AFTER set_ {password}, {user}")
        user.save(using=self._db)
        print("models custom manager 9 saved")
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')

        return self._create_user(email, password, **extra_fields)


# Custom User model for authentication
class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    
    def save(self, *args, **kwargs):
        print("Custom user model 6")
        if self._state.adding:
            print("Custom user model 7")
            logger.info(f'Creating new user: {self.email}')
        else:
            print("Custom user model 8")
            logger.info(f'Updating user: {self.email}')
        super().save(*args, **kwargs)

        logger.info(f"Hashed password: {self.password}")
        print("Custom user model 9")
    def delete(self, *args, **kwargs):
        logger.info(f'Deleting user: {self.email}')
        super().delete(*args, **kwargs)

# Item model for managing items
class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.id:
            logger.info(f'Creating new item: {self.name}')
        else:
            logger.info(f'Updating item: {self.name}')
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        logger.info(f'Deleting item: {self.name}')
        super().delete(*args, **kwargs)




# Commented-out infrastructure and normal models for future development
              
# ### Infastructure Models
# phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Example: ...")

# class ActiveObjectsManager(models.Manager):
#     def get_queryset(self) -> models.QuerySet:
#         return super().get_queryset().filter(deleted_at__isnull=True)
    
# class SoftDeleteModel(models.Model):
#     deleted_at = models.DateTimeField(null=True, blank=True)

#     objects = models.Manager() # Default manager
#     active_objects = ActiveObjectsManager() # Custom manager to filter out soft-delete records

#     class Meta:
#         abstract = True # stops creations of seperate table in database    
    
#     def delete(self, *args, **kwargs):
#         self.deleted_at = timezone.now()
#         self.save()
    
#     def hard_delete(self, *args, **kwargs):
#         super(SoftDeleteModel, self).delete(*args, **kwargs)


# ### Normal Models 
# class ConstructionManager(SoftDeleteModel):
#     name = models.CharField(max_length=225)
#     phone_number = models.CharField(validators=[phone_regex], max_length=13, blank=True)

#     def __str__(self):
#         return self.name

# class JobSite(SoftDeleteModel):
#     name = models.CharField(max_length=255)
#     construction_manager = models.ForeignKey(ConstructionManager, on_delete=models.CASCADE)
#     #hours total

#     def __str__(self):
#         return self.name

# class WorkEntry(SoftDeleteModel): 
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     date = models.DateField()

#     calendar_week = models.IntegerField(null=True, blank=True)
#     calendar_year = models.IntegerField(null=True, blank=True)
#     def save(self, *args, **kwargs):
#         if self.date:
#             year_week = self.date.isocalendar()
#             self.calendar_year, self.calendar_week = year_week[0], year_week[1]
#         super(WorkEntry, self).save(*args, **kwargs)
    
#     job_site = models.ForeignKey(JobSite, on_delete=models.CASCADE)
#     hours_worked = models.DecimalField(max_digits=5, decimal_places=2)

#     def __str__(self):
#         return f"{self.user.username} - {self.job_site.name} - {self.date} - {self.calendar_week} - {self.calendar_year}"




    
    