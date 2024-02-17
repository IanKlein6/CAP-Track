from django.contrib.auth.models import User
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Creates a default superuser if it does not exist'

    def handle(self, *args, **kwargs):
        if not User.objects.filter(username='admin1').exists():
            User.objects.create_superuser('admin1', 'admin1@example.com', 'adminpassword1')
            self.stdout.write(self.style.SUCCESS('Default superuser created successfully'))
        else:
            self.stdout.write(self.style.WARNING('Default superuser already exists'))
