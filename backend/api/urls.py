from django.urls import path
from . import views

urlpatterns = [
    path('update_api/', views.update_klaviyo_data, name='update_api'),
    path('get_json/', views.klaviyo_json_data, name='get_json'),      
    path('is_updating/', views.updating_klaviyo_data, name='is_updating'),   
    path('download_excel/', views.download_excel, name='download_excel'),   
    path('key_management/', views.key_management, name='key_management'),  
    path('change_password/', views.change_password, name='change_password'), 
]