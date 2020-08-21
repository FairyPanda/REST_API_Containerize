from .models import UserDetails, InterviewDetails
from rest_framework import serializers
from rest_framework.exceptions import APIException

class InterviewDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewDetails
        fields = "__all__"
        
    def validate(self, attrs):
        print(attrs)
        raise APIException("Idrtfgvybhnjknvalid")
        return attrs
        
class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = "__all__"
        
    def validate(self, attrs):
        print(attrs)
        return attrs
    
        