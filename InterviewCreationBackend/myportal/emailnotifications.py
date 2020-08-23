from django.core.mail import send_mail
from django.conf import settings
from .models import UserDetails


class Notify:
    def __init__(self):

        self.new_schedule_subject = ''' New Interview Invitation! '''
        self.new_schedule_messagebody = ''' 
            Your are Invited to the a Interview.
            Timings: {startTime} till {endTime}.
            Participants: {participants}
        '''

        self.reschedule_subject = ''' Interview Rescheduled! '''
        self.reschedule_messagebody = '''
            Your Interview is reshuduled.
            old timing: {oldstartTime} till {oldendTime}
            New timings:  {startTime} till {endTime}.
            Participants: {participants}
        '''

        self.cancelled_subject = ''' Interview Cancelled! '''
        self.cancelled_messagebody = '''
            Your Interview is cancelled.
            cancelled timings:  {startTime} till {endTime}.
        '''

    def SendMail(self, subject, body, participant_emails):
        isSuccessfull = 0
        try:
            isSuccessfull = send_mail(
                subject,
                body,
                settings.EMAIL_HOST_USER,
                participant_emails, fail_silently=False
            )
        except:
            print("unable to send")
        finally:
            return isSuccessfull

    def CancelledInvitation(self, List, startTime, endTime):

        utilobj = ModelUitil()
        participants = utilobj.getuserDetailsfromId(List)

        cancelled_messagebody = self.cancelled_messagebody.format(
            startTime=startTime, endTime=endTime, participants=participants)

        return self.SendMail(self.cancelled_subject, cancelled_messagebody, participants)

    def SendNewInvitation(self, List, startTime, endTime):

        utilobj = ModelUitil()
        participants = utilobj.getuserDetailsfromId(List)

        new_schedule_messagebody = self.new_schedule_messagebody.format(
            startTime=startTime, endTime=endTime, participants=participants)

        return self.SendMail(self.new_schedule_subject, new_schedule_messagebody, participants)

    def SendRescheduleInvitation(self, List, oldstartTime, oldendTime, startTime, endTime):

        utilobj = ModelUitil()
        participants = utilobj.getuserDetailsfromId(List)

        reschedule_messagebody = self.reschedule_messagebody.format(
            oldstartTime=oldstartTime, oldendTime=oldendTime,
            startTime=startTime, endTime=endTime, participants=participants)

        return self.SendMail(self.reschedule_subject, reschedule_messagebody, participants)


class ModelUitil:
    def getuserDetailsfromId(self, List):
        participants = []
        for userid in List:
            UserObj = UserDetails.objects.get(pk=userid)
            participants.append(UserObj.email)

        return participants
