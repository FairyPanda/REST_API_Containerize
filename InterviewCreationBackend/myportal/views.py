from .serializers import InterviewDetailsSerializer
from .serializers import UserDetailsSerializer
from rest_framework import generics
from rest_framework.parsers import JSONParser
from .models import UserDetails, InterviewDetails
from django.http import HttpResponse, JsonResponse
import pytz, datetime
# assuming that currently admin users are only accessing the website

    
def getInterviewsbyusers(request, pk):
        currentTime = datetime.datetime.now().replace(tzinfo=pytz.UTC)
        print(currentTime)
        queryset =  InterviewDetails.objects.filter(participants = pk, endTime__gte = currentTime).order_by('startTime')
        serializer = InterviewDetailsSerializer(queryset , many = True)
        return JsonResponse(serializer.data, safe = False)

class manageInterviewsList(generics.ListCreateAPIView):
    currentTime = datetime.datetime.utcnow().replace(tzinfo=pytz.UTC)
    queryset = InterviewDetails.objects.filter(endTime__gte = currentTime).order_by('startTime')
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

