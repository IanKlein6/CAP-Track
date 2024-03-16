from django.contrib import admin
from .models import CustomUser, InvitationCode

# Register models
admin.site.register(CustomUser)
admin.site.register(InvitationCode)
