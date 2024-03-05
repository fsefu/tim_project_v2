from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth import authenticate, login
from django.http import  JsonResponse
from django.contrib.auth.models import User  # Import Django's default User model
import json
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST



def get_csrf(request):
    print("Here is csrf")
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response

# @require_POST
def login_view(request):
    
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        email = data.get('email')
        password = data.get('password')
        # username = 'safe'
        # password='1234'
        print(email,"  : ", password)
        if email is None or password is None:
            return JsonResponse({'detail': 'Please provide email and password.'}, status=400)

        user = authenticate(username=email, password=password)
        print("This is user: ",user)
        if user is None:
            return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

        login(request, user)
        return JsonResponse({'detail': 'Successfully logged in.'})
    
    else:
        print(request.user.is_authenticated)
        if(not request.user.is_authenticated):
            return JsonResponse({'detail': 'Invalid credentials.'}, status=400)



def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False,})
    return JsonResponse({'isAuthenticated': True, 'is_staff':request.user.is_staff})


    
@api_view(['POST'])
def register_user(request):
    print("Here in the register")
    
    data = request.data
    print(data)
    serializer = UserSerializer(data=data)

    if serializer.is_valid():
        User.objects.create_user(
            username=data['email'],
            password=data['password'],
        )
        return Response(serializer.data, status=201)
    else:
        return Response(serializer.errors, status=400)



@require_POST
def test_view(request):
    print("Here is the test view")
    data = json.loads(request.body)
    print(data)
    email = data.get('email')
    password = data.get('password')
    # username = 'safe'
    # password='1234'
    print(email,"  : ", password)
    if email is None or password is None:
        return JsonResponse({'detail': 'Please provide email and password.'}, status=400)

    user = authenticate(email=email, password=password)
    print("This is user: ",user)
    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    login(request, user)
    return JsonResponse({'detail': 'Successfully logged in.'})

