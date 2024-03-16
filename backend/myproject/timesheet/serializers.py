from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Item

# Get the custom user model
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """Serializer for the User model."""
    
    class Meta:
        model = User
        # Specify the fields to include in the serialized representation.
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')
        # Ensure the password is write-only to prevent it from being read back.
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        """Create and return a new user, properly handling the password."""
        # Use the create_user method to handle user creation
        user = User.objects.create_user(
            username=validated_data['username'],
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
