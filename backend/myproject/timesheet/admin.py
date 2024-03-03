from django.contrib import admin
from .models import CustomUser, InvitationCode

# If you had previously registered CustomUser or want to modify its admin interface

admin.site.register(CustomUser)

# Registering InvitationCode
admin.site.register(InvitationCode)
