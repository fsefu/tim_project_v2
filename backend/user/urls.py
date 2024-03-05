from django.urls import path
from . import views

urlpatterns = [
    path('csrf/', views.get_csrf, name='api-csrf'),
    path('register/', views.register_user, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('session/', views.session_view, name='session'),

]