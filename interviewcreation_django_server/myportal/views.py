from .serializers import InterviewDetailsSerializer
from .serializers import UserDetailsSerializer
from rest_framework import generics
from .models import UserDetails, InterviewDetails

# assuming that currently admin users are only accessing the website

class manageInterviewsList(generics.ListCreateAPIView):
    queryset = InterviewDetails.objects.all()
    serializer_class = InterviewDetailsSerializer

class manageInterviewsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = InterviewDetails.objects.all()
    serializer_class = InterviewDetailsSerializer
    
class manageusersList(generics.ListCreateAPIView):
    queryset = UserDetails.objects.all()
    serializer_class = UserDetailsSerializer

class manageusersDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserDetails.objects.all()
    serializer_class = UserDetailsSerializer

