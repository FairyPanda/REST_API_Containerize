from django.db import models
from django.contrib.postgres.fields import ArrayField
import datetime


class UserDetails(models.Model):
    email = models.EmailField(max_length = 254, blank = False)
    username = models.CharField(max_length=200,blank = False)
    password = models.CharField(max_length=200,blank = False)
    userType = models.CharField(max_length=200,blank = False)
    
    def __str__(self):
        return self.username
    
class InterviewDetails(models.Model):
    startTime = models.DateTimeField(blank = False)
    endTime = models.DateTimeField(blank = False)
    participants = models.ManyToManyField( UserDetails )
    
    # def __str__(self):
    #     return str(self.startTime) + " to " + str(self.endTime)


