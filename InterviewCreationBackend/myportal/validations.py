import datetime, pytz
from .models import UserDetails, InterviewDetails

class validators:
    
    def __init__(self, startTime, endTime, participants):
        self.startTime = startTime
        self.endTime = endTime
        self.participants = participants
        self.valid = True
        self.errorMessage = ""
    
    
    def isvalid(self):
        return self.valid
    
    def setvalid(self, value):
        self.valid = value
    
    def getErrorMessage(self):
        return self.errorMessage
    
    def appendErrorMessage(self, message):
        if self.errorMessage == "":
            self.errorMessage = message
        else:
            self.errorMessage = self.errorMessage + ', ' + message 
        
    def validateParticipants(self):
        for user in self.participants:
            # checking if the user dont have overlapping inerviews interview
            scheduledInterviews = InterviewDetails.objects.filter(participants = user)
            
            if self.checkOverlapping(scheduledInterviews) == False:
                self.setvalid(False)
                self.appendErrorMessage("User with userId = "+str(user.id)+" has overlapping Interviews")

    def checkOverlapping(self, Interviews):
        for slot in Interviews:
            if slot.startTime >= self.endTime or slot.endTime <= self.startTime:
                continue
            else:
                return False
        return True
    
    def validateTime(self):
        # checks if the time mentioned is correct or not
        if self.startTime > self.endTime:
            self.setvalid(False)
            self.appendErrorMessage("Start Time can't be > End Time")
        # checks if interview is scheduled in the past time
        currentTime = datetime.datetime.utcnow().replace(tzinfo=pytz.UTC)
        if self.startTime < currentTime or self.endTime < currentTime:
            self.setvalid(False)
            self.appendErrorMessage("Interviews in the past can't be scheduled")
        