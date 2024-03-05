from django.shortcuts import render

# Create your views here


def index(request):
    # return "Hello"
    return render(request, "chat/index.html")


def room(request, room_name):
    # return "Hello22"
    return render(request, "chat/room.html", {"room_name": room_name})
