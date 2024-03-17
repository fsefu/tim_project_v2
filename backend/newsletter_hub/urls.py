from django.urls import path
from . import views

urlpatterns = [
    path("upload-newsletter-pdf/", views.upload_file, name="upload_file"),
    path("get-newsletter-data/", views.get_newsletter_data, name="get_newsletter_data"),
    path("process-pdf/<int:id>/", views.process_pdf_data, name="process_pdf_data"),
    path(
        "newsletter-content/<int:newsletter_data_id>/",
        views.get_news_letter_content,
        name="get_news_letter_content",
    ),
]
