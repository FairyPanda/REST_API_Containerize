from django.core.mail import send_mail
from django.conf import settings


class Notify:
    def __init__(self, interview):
        self.startTime = interview.startTime
        self.endTime = interview.endTime
        self.participant_emails = []

        for user in interview.participants.values():
            self.participant_emails.append(user["email"])

        print(self.participant_emails)

    def SendNewInvitation(self):

        new_schedule_subject = ''' New Interview Invitation! '''
        new_schedule_messagebody = ''' 
            Your are Invited to the a Interview.
            Timings: {startTime} till {endTime}.
            Participants: {participants}
        '''.format(startTime=self.startTime, endTime=self.endTime, participants=self.participant_emails)

        isSuccessfull = send_mail(
            new_schedule_subject,
            new_schedule_messagebody,
            settings.EMAIL_HOST_USER,
            self.participant_emails, fail_silently=False
        )
        return isSuccessfull

    def SendUpdatedInvitation(self):

        reschedule_subject = ''' Interview Rescheduled! '''
        reschedule_messagebody = '''
            Your Interview is reshuduled.
            New timings:  {startTime} till {endTime}.
            Participants: {participants}
        '''.format(startTime=self.startTime, endTime=self.endTime, participants=self.participant_emails)

        isSuccessfull = send_mail(
            reschedule_subject,
            reschedule_messagebody,
            settings.EMAIL_HOST_USER,
            self.participant_emails, fail_silently=False
        )
        return isSuccessfull

    def CancelledInvitation(self):

        cancelled_subject = ''' Interview Cancelled! '''
        cancelled_messagebody = '''
            Your Interview is cancelled.
            cancelled timings:  {startTime} till {endTime}.
        '''.format(startTime=self.startTime, endTime=self.endTime)

        isSuccessfull = send_mail(
            cancelled_subject,
            cancelled_messagebody,
            settings.EMAIL_HOST_USER,
            self.participant_emails, fail_silently=False
        )
        return isSuccessfull
