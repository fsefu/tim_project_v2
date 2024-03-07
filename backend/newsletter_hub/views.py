from datetime import datetime  # Import datetime module
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import NewsLetterData


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
