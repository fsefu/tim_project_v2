from django.db import models
import uuid

class KlaviyoApiKey(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField()
    api_key = models.CharField(max_length=100)