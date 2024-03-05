# authentication_middleware.py

from django.shortcuts import redirect
from django.urls import reverse

class AuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not request.user.is_authenticated:
            # Redirect unauthenticated users to the login page
            return redirect(reverse('login'))  # Adjust 'login' to your actual login URL name or path

        # Check if the user is not staff and trying to access a staff-only route
        if not request.user.is_staff and request.path == '/staff-only-route':
            # Redirect non-staff users trying to access staff-only route
            return redirect(reverse('unauthorized'))  # Adjust 'unauthorized' to your unauthorized access URL name or path

        response = self.get_response(request)
        return response
