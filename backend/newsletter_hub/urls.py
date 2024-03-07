from django.urls import path
from . import views

urlpatterns = [
    path("upload-newsletter-pdf/", views.upload_file, name="upload_newsletter_pdf"),
]
