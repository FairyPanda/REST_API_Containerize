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

            newData = serializer.data
            Notifyobj = Notify()
            isSuccessfull = Notifyobj.SendNewInvitation(
                newData["participants"], newData["startTime"], newData["endTime"])
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

        serializer = InterviewDetailsSerializer(Interview)
        oldData = serializer.data
        Interview.delete()

        serializer = InterviewDetailsSerializer(Interview, data=request.data)

        if serializer.is_valid():
            serializer.save()

            Notifyobj = Notify()

            newData = serializer.data
            userDict = {}

            for userid in oldData["participants"]:
                userDict[userid] = 1

            for userid in newData["participants"]:
                if userDict.get(userid) == None:
                    userDict[userid] = 1
                else:
                    userDict[userid] += 1

            CancelledList = []
            RescheduleList = []
            NewScheduleList = []

            for userid in oldData["participants"]:
                if userDict[userid] == 1:
                    CancelledList.append(userid)
                else:
                    RescheduleList.append(userid)

            for userid in newData["participants"]:
                if userDict[userid] == 1:
                    NewScheduleList.append(userid)

            isSuccessfull = Notifyobj.CancelledInvitation(
                CancelledList, oldData["startTime"], oldData["endTime"])

            isSuccessfull = Notifyobj.SendRescheduleInvitation(
                RescheduleList, newData["startTime"], newData["endTime"],
                oldData["startTime"], oldData["endTime"])

            isSuccessfull = Notifyobj.SendNewInvitation(
                NewScheduleList, newData["startTime"], newData["endTime"])

            return Response(serializer.data)

        serializer = InterviewDetailsSerializer(data=request.data)
        serializer.save()

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        serializer = InterviewDetailsSerializer(Interview)
        oldData = serializer.data
        Interview.delete()

        # sending notifications
        Notifyobj = Notify()
        isSuccessfull = Notifyobj.CancelledInvitation(
            oldData["participants"], oldData["startTime"], oldData["endTime"])

        return Response(status=status.HTTP_204_NO_CONTENT)
