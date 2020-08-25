from .models import UserDetails, InterviewDetails
from rest_framework import serializers
from .validations import validators


class InterviewDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewDetails
        fields = "__all__"

    def validate(self, attrs):
        self.startTimeData = attrs["startTime"]
        self.endTTimeData = attrs["endTime"]
        self.participantsData = attrs["participants"]

        validateObj = validators(
            self.startTimeData, self.endTTimeData, self.participantsData)
        validateObj.validateTime()
        validateObj.validateCountofParticipants()

        if validateObj.isvalid() == False:
            raise serializers.ValidationError(validateObj.getErrorMessage())

        return attrs

    def checkCreateoverlapping(self):
        validateObj = validators(
            self.startTimeData, self.endTTimeData, self.participantsData)
        validateObj.validateOverlappings()

        if validateObj.isvalid() == False:
            raise serializers.ValidationError(validateObj.getErrorMessage())
        return True

    def checkUpdateoverlappings(self, oldDataid):
        validateObj = validators(
            self.startTimeData, self.endTTimeData, self.participantsData)
        validateObj.validateOverlappings(oldDataid)

        if validateObj.isvalid() == False:
            raise serializers.ValidationError(validateObj.getErrorMessage())
        return True


class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = ['id', 'username', 'email', 'userType']

    def validate(self, attrs):
        return attrs
