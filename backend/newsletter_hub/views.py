from datetime import datetime
import os  # Import datetime module
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import NewsLetter, NewsLetterData
from django.shortcuts import get_object_or_404
from .data_extractor import data_extractor
import tempfile


@csrf_exempt
def upload_file(request):
    if request.method == "POST" and request.FILES.get("file"):
        uploaded_file = request.FILES["file"]
        title = request.POST.get("title")

        print("title: ", title)
        news_letter_data = NewsLetterData.objects.create(
            file_name=uploaded_file,
            title=title,  # You can also set the title based on the file name
            date=datetime.now(),  # Use datetime.now() to get the current date and time
        )

        return JsonResponse({"message": "File uploaded successfully"})
    else:
        return JsonResponse(
            {"error": "File not provided or invalid request"}, status=400
        )


def get_newsletter_data(request):
    if request.method == "GET":
        # Retrieve all NewsLetterData objects from the database
        newsletter_data = NewsLetterData.objects.all()

        # Serialize the data into a JSON format
        serialized_data = []
        for data in newsletter_data:
            serialized_data.append(
                {
                    "id": data.id,
                    "title": data.title,
                    "file_name": data.file_name.url,  # Assuming file_name is a FileField
                    "date": data.date.strftime("%Y-%m-%d"),
                    "isGenerated": data.isGenerated,
                }
            )

        # Return the serialized data as a JSON response
        return JsonResponse(serialized_data, safe=False)
    else:
        # If request method is not GET, return an error response
        return JsonResponse({"error": "Invalid request method"}, status=405)


def process_pdf_data(request, id):
    # Retrieve the NewsLetterData object by its ID
    news_letter_data = get_object_or_404(NewsLetterData, id=id, isGenerated=False)

    # Access the PDF file associated with the object
    pdf_file = news_letter_data.file_name
    print("pdf_file: ", pdf_file.path)

    # Pass the temporary file path to the data_extractor function
    res = data_extractor(pdf_file.path, id)

    # Here you can pass the PDF data and ID to your desired function
    # For example, you can directly pass the file content to HttpResponse
    with open(pdf_file.path, "rb") as f:
        pdf_data = f.read()

    # Process the PDF data here, e.g., pass it to a function
    process_pdf(pdf_data, id)
    # data_extractor(pdf_data, id)

    # Return an HttpResponse with the PDF data if needed
    print("res: ", res)
    return HttpResponse(res)


def process_pdf(pdf_data, id):
    print(f"Processing PDF with ID {id}")


def get_news_letter_content(request, newsletter_data_id):
    try:
        newsletter_data = NewsLetterData.objects.get(id=newsletter_data_id)
        news_letter_content = NewsLetter.objects.get(
            text_id__file_id=newsletter_data
        ).news_letter_content
        return JsonResponse({"news_letter_content": news_letter_content})
    except (NewsLetterData.DoesNotExist, NewsLetter.DoesNotExist):
        return JsonResponse({"error": "News Letter Content not found"}, status=404)
