from django.urls import path
from . import views

# URL patterns for employee's API
# Includes endpoints for listing, creating, and managing employees and departments,


urlpatterns = [
    path('api/employees/', views.employee_list, name='employee_list'),
    path('api/employees/create/', views.employee_create, name='employee_create'),
    path('api/employees/<int:id>/', views.employee_detail, name='employee_detail'),
    path('api/departments/', views.department_list, name='department_list'),
]