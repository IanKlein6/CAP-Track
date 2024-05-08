from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Item

# Get the custom user model
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user
    
    
class ItemSerializer(serializers.ModelSerializer):
    """Serializer for the Item model."""

    class Meta:
        model = Item
        # Serialize all fields from the Item model.
        fields = '__all__'
