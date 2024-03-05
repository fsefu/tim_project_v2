# myapp/serializers.py
from rest_framework import serializers
from .models import KlaviyoApiKey

class KlaviyoApiKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = KlaviyoApiKey
        fields = '__all__'
