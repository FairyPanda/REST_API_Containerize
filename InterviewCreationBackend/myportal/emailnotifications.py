from django.core.mail import send_mail
from django.conf import settings
from .models import UserDetails


class Notify:
    def __init__(self, interview):
        self.startTime = interview.startTime
        self.endTime = interview.endTime
        self.participant_emails = []

        for user in interview.participants.values():
            self.participant_emails.append(user["email"])

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

    def SendNewInvitation(self):
        new_schedule_messagebody = self.new_schedule_messagebody.format(
            startTime=self.startTime, endTime=self.endTime, participants=self.participant_emails)

        isSuccessfull = send_mail(
            self.new_schedule_subject,
            new_schedule_messagebody,
            settings.EMAIL_HOST_USER,
            self.participant_emails, fail_silently=False
        )
        return isSuccessfull

    def CancelledInvitation(self):

        cancelled_messagebody = self.cancelled_messagebody.format(
            startTime=self.startTime, endTime=self.endTime, participants=self.participant_emails)

        isSuccessfull = send_mail(
            self.cancelled_subject,
            cancelled_messagebody,
            settings.EMAIL_HOST_USER,
            self.participant_emails, fail_silently=False
        )
        return isSuccessfull

    def CancelledInvitation_byList(self, List, startTime, endTime):

        participants = []

        for userid in List:
            UserObj = UserDetails.objects.get(pk=userid)
            participants.append(UserObj.email)

        cancelled_messagebody = self.cancelled_messagebody.format(
            startTime=startTime, endTime=endTime, participants=participants)

        isSuccessfull = send_mail(
            self.cancelled_subject,
            cancelled_messagebody,
            settings.EMAIL_HOST_USER,
            participants, fail_silently=False
        )
        return isSuccessfull

    def SendNewInvitation_byList(self, List, startTime, endTime):

        participants = []

        for userid in List:
            UserObj = UserDetails.objects.get(pk=userid)
            participants.append(UserObj.email)

        new_schedule_messagebody = self.new_schedule_messagebody.format(
            startTime=startTime, endTime=endTime, participants=participants)

        isSuccessfull = send_mail(
            self.new_schedule_subject,
            new_schedule_messagebody,
            settings.EMAIL_HOST_USER,
            participants, fail_silently=False
        )
        return isSuccessfull

    def SendRescheduleInvitation_byList(self, List, oldstartTime, oldendTime, startTime, endTime):

        participants = []

        for userid in List:
            UserObj = UserDetails.objects.get(pk=userid)
            participants.append(UserObj.email)

        reschedule_messagebody = self.reschedule_messagebody.format(
            oldstartTime=oldstartTime, oldendTime=oldendTime,
            startTime=startTime, endTime=endTime, participants=participants)

        isSuccessfull = send_mail(
            self.reschedule_subject,
            reschedule_messagebody,
            settings.EMAIL_HOST_USER,
            participants, fail_silently=False
        )
        return isSuccessfull
