from .serializers import InterviewDetailsSerializer
from .serializers import UserDetailsSerializer
from rest_framework import generics
from rest_framework.parsers import JSONParser
from .models import UserDetails, InterviewDetails
from django.http import HttpResponse, JsonResponse
import pytz

# assuming that currently admin users are only accessing the api

def getInterviewsbyusers(request, pk):
    queryset = InterviewDetails.objects.filter(participants = int(pk))
    if queryset.count() == 0:
        return HttpResponse(status = 400)
    serializer = InterviewDetailsSerializer(queryset)
    return JsonResponse(serializer.data)
        
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

