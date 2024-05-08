from django.contrib import admin
from django import forms
from.models import CustomUser  # Make sure to import your CustomUser model

class CustomUserChangeForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = '__all__'  # Or specify the fields you want to include
        

    def save(self, commit=True):
        print("admin change forum 1")
        user = super().save(commit=False)  # Call the base class save method to get the user instance
        if 'password' in self.changed_data:  # Check if the password was changed
            print("admin change forum 2")
            password = self.cleaned_data['password']
            print(f"admin change forum 3 {password}")
            user.set_password(password)  # Set the new password
            print(f"admin change forum 4 {user}, {password}")
        if commit:
            print("admin change forum 5")
            user.save()  # Save the user instance to the database
            print("admin change forum 6 saved")
        return user


class CustomUserAdmin(admin.ModelAdmin):
    form = CustomUserChangeForm  # Use the custom form
    # Define your admin configuration here
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)

    # You can also specify the order of fields
    fieldsets = (
        ('Personal info', {
            'fields': ('email', 'password', 'first_name', 'last_name', 'bio')
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
        }),
    )
admin.site.register(CustomUser, CustomUserAdmin)
