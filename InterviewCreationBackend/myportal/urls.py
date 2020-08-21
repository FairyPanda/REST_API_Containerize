from django.urls import path, re_path
from . import views

urlpatterns = [   
    path('manageInterviews/', views.manageInterviewsList.as_view()),
    path('manageInterviews/<int:pk>/', views.manageInterviewsDetail.as_view()),
    path('manageusers/', views.manageusersList.as_view()),
    path('manageusers/<int:pk>/', views.manageusersDetail.as_view()),
]