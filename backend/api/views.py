import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from api.integration.generate_excel import generate_excel

# from integration.generate_excel import generate_excel
from api.integration.get_data import get_data
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from .models import KlaviyoApiKey
from .serializers import KlaviyoApiKeySerializer
from django.contrib.auth import authenticate


@api_view(["GET"])
def updating_klaviyo_data(request):

    file_path = "api/data/updating_status.json"
    with open(file_path, "r") as file:
        data = file.read()

    response = HttpResponse(data, content_type="application/json")
    return response


@login_required(redirect_field_name="update_api", login_url="/auth/login/")
@api_view(["GET"])
def update_klaviyo_data(request):
    api_key = KlaviyoApiKey.objects.get(email=request.user.username)
    # print("Key",api_key.api_key)
    file_path = "api/data/updating_status.json"
    with open(file_path, "r") as file:
        data = json.load(file)
    # Update the data (for example)
    data["is_updating"] = True

    # Write updated JSON data back to the file
    with open(file_path, "w") as file:
        json.dump(data, file, indent=4)

    klaviyo_api_key = api_key.api_key
    list_url = "https://a.klaviyo.com/api/lists/"
    segment_url = "https://a.klaviyo.com/api/segments/"
    lists_data = get_data(list_url, klaviyo_api_key, "List")
    print(lists_data)
    segments_data = get_data(segment_url, klaviyo_api_key, "Segment")
    generate_excel(lists_data, segments_data)

    with open(file_path, "r") as file:
        data = json.load(file)
    # Update the data (for example)
    data["is_updating"] = False

    # Write updated JSON data back to the file
    with open(file_path, "w") as file:
        json.dump(data, file, indent=4)

    return JsonResponse({"detail": "Successfully Generated."})


@login_required(redirect_field_name="get_json", login_url="/auth/login/")
@api_view(["GET"])
def klaviyo_json_data(request):

    file_path = "api/data/lists_segments_data.json"
    with open(file_path, "r") as file:
        data = file.read()

    response = HttpResponse(data, content_type="application/json")
    return response


def download_excel(request):

    excel_file_path = "api/data/lists_and_segments.xlsx"
    with open(excel_file_path, "rb") as excel_file:
        response = HttpResponse(
            excel_file.read(),
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
        response["Content-Disposition"] = "attachment; filename=example.xlsx"
        return response


@login_required(redirect_field_name="key_management", login_url="/auth/login/")
def key_management(request):
    print("method: ", request.method)
    if request.user.is_authenticated:
        if request.method == "GET":
            print("Inside Here")
            existing_api_key = KlaviyoApiKey.objects.filter(
                email=request.user.username
            ).first()
            print("exKey: ", existing_api_key)
            if existing_api_key:
                return JsonResponse({"key_exist": True})
            return JsonResponse({"key_exist": False}, status=404)

        if request.method == "POST":
            data = json.loads(request.body.decode("utf-8"))
            request_type = data["data"]["request_type"]
            api_key = data["data"]["api_key"]
            # data={request.user.username, api_key}
            # print("data: ", data)
            # if request_type == "create":
            # Check if an API key already exists for the user
            existing_api_key = KlaviyoApiKey.objects.filter(
                email=request.user.username
            ).first()
            if existing_api_key:
                # If an API key already exists, update it
                serializer = KlaviyoApiKeySerializer(
                    existing_api_key, data={"api_key": api_key}, partial=True
                )
            else:
                serializer = KlaviyoApiKeySerializer(
                    data={"email": request.user.username, "api_key": api_key}
                )

            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=200)

            return JsonResponse(serializer.errors, status=400)
            # sername = request.user.username
        return HttpResponse({"detail": "Your Key Added Succeessfully"})
    else:
        return HttpResponse("You are not logged in.")


@api_view(["POST"])
def create_klaviyo_api_key(request):
    if request.method == "POST":
        serializer = KlaviyoApiKeySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@login_required(redirect_field_name="change_password", login_url="/auth/login/")
def change_password(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        old_password = data["data"]["oldpassword"]
        new_password = data["data"]["newpassword"]
        confirm_new_password = data["data"]["confirmNewpassword"]

        # Authenticate the user
        user = authenticate(username=request.user.username, password=old_password)
        if user is None:
            return JsonResponse(
                {"success": False, "message": "Invalid old password"}, status=400
            )

        # Check if new password matches the confirmation
        if new_password != confirm_new_password:
            return JsonResponse(
                {
                    "success": False,
                    "message": "New password and confirm password do not match",
                },
                status=400,
            )

        # Update the password
        try:
            user.set_password(new_password)
            user.save()
            # If using session-based authentication, re-authenticate user
            # login(request, user)
            return JsonResponse(
                {"success": True, "message": "Password changed successfully"}
            )
        except Exception as e:
            return JsonResponse(
                {
                    "success": False,
                    "message": "Failed to change password: {}".format(str(e)),
                },
                status=500,
            )
