from django.contrib import admin
from .models import JobSite, WorkEntry, ConstructionManager

class JobSiteAdmin(admin.ModelAdmin):
    list_display = ('name', 'construction_manager')

class WorkdEntryAdmin(admin.ModelAdmin):
    list_display = ('user', 'job_site', 'date', 'hours_wored', 'calendar_week')

admin.site.register(JobSite)
admin.site.register(WorkEntry)
admin.site.register(ConstructionManager)


#from django.contrib.auth.models import User  Only needed if customizing the User admin
# If customizing User admin, you would first unregister, then register with a custom ModelAdmin
# admin.site.unregister(User)
# admin.site.register(User, CustomUserAdmin)