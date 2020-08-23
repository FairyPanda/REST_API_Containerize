from .serializers import InterviewDetailsSerializer
from .serializers import UserDetailsSerializer
from rest_framework import generics
from rest_framework import status
from .models import UserDetails, InterviewDetails
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .emailnotifications import Notify
import pytz
import datetime

# assuming that currently admin users are only accessing the website


def getCurrentTime():
    return datetime.datetime.utcnow().replace(tzinfo=pytz.UTC)


@api_view(['GET'])
def getInterviewsbyusers(request, pk):
    currentTime = getCurrentTime()
    queryset = InterviewDetails.objects.filter(
        participants=pk, endTime__gte=currentTime).order_by('startTime')
    serializer = InterviewDetailsSerializer(queryset, many=True)
    return Response(serializer.data)


class manageusersList(generics.ListCreateAPIView):
    queryset = UserDetails.objects.all()
    serializer_class = UserDetailsSerializer


class manageusersDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserDetails.objects.all()
    serializer_class = UserDetailsSerializer


@api_view(['GET', 'POST'])
def manageInterviewsList(request):
    if request.method == 'GET':
        currentTime = getCurrentTime()
        queryset = InterviewDetails.objects.filter(
            endTime__gte=currentTime).order_by('startTime')
        serializer = InterviewDetailsSerializer(queryset, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = InterviewDetailsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            # sending notifications
            Interview = InterviewDetails.objects.get(pk=serializer.data["id"])
            Notifyobj = Notify(Interview)
            isSuccessfull = Notifyobj.SendNewInvitation()
            print(isSuccessfull)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def manageInterviewsDetail(request, pk):
    try:
        Interview = InterviewDetails.objects.get(pk=pk)
    except InterviewDetails.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = InterviewDetailsSerializer(Interview)
        return Response(serializer.data)

    elif request.method == 'PUT':

        oldInterview = Interview
        oldData = InterviewDetailsSerializer(oldInterview).data
        oldData["id"] = Interview.id
        oldInterview.delete()

        serializer = InterviewDetailsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            sending notifications
            newInterview = InterviewDetails.objects.get(
                pk=serializer.data["id"])

            Notifyobj = Notify(newInterview)

            isSuccessfull = Notifyobj.SendNewInvitation()
            print(isSuccessfull)

            return Response(serializer.data)

        serializer = InterviewDetailsSerializer(data=oldData)
        serializer.save()

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        Notifyobj = Notify(Interview)
        Interview.delete()

        # sending notifications
        isSuccessfull = Notifyobj.CancelledInvitation()
        print(isSuccessfull)

        return Response(status=status.HTTP_204_NO_CONTENT)
