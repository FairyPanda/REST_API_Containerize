from .models import UserDetails, InterviewDetails
from rest_framework import serializers
from rest_framework.exceptions import APIException
from .validations import validators 

class InterviewDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewDetails
        fields = "__all__"
        
    def validate(self, attrs):
        validateObj = validators(attrs["startTime"], attrs["endTime"], attrs["participants"])
        validateObj.validateTime()
        validateObj.validateParticipants()
        validateObj.validateCountofParticipants()
        
        if validateObj.isvalid() == False:
            raise APIException(validateObj.getErrorMessage())
        
        return attrs
        
class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = "__all__"
        
    def validate(self, attrs):
        return attrs
    
        