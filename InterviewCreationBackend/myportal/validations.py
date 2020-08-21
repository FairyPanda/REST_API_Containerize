import datetime
from .models import UserDetails, InterviewDetails

class validators:
    
    def __init__(self, startTime, endTime, participants):
        self.startTime = startTime
        self.endTime = endTime
        self.participants = participants
        self.valid = True
    
    def isvalid(self):
        return self.valid
    
    def setvalid(self, value):
        self.valid = value
        
    def validateParticipants(self):
        for userid in self.participants:
            records = UserDetails.objects.filter(id = userid)
            # checking if the user exists
            if records.count() == 0:
                self.valid(False)
            # checking if the user dont have overlapping inerviews interview
            if self.checkOverlapping(records[0]["scheduledInterviews"]) == False:
                self.valid(False)

    def checkOverlapping(self, Interviews ):
        for slot in Interviews:
            if slot[0] >= self.endTime or slot[1] <= self.startTime:
                continue
            else:
                return False
        return True
    
    def validateTime(self):
        # checks if interview is scheduled in the past time
        currentTime = datetime.datetime.now()
        if self.startTime < currentTime or self.endTime < currentTime:
            self.valid(False)
        