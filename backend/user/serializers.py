from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Specify password as write-only
    print("Here inside the  UserSerializer")
    class Meta:
        model = User
        fields = ['id','email', 'password']  # Add other fields as needed
        print("This is all fields inside the serializer: ",fields)
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))  # Hash the password
        return super(UserSerializer, self).create(validated_data)
