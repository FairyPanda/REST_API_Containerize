# InterviewCreationPortal

This is a portal for scheduling Interview between candidates

Back-end Docker Image: https://hub.docker.com/r/vibhu4agarwal/test_rest_api_interview_creation


Deployed frontend : https://afternoon-escarpment-58999.herokuapp.com/
=>single paged react app

Deployed backend: https://blooming-beyond-14533.herokuapp.com/ 
=>Django server

There are 5 rest api endpoints
endpoints also send emails to repective user about the operations of the interview.

1. For getting all upcoming interviews/ creating new interviews:
    manageInterviews/
    
2. For getting specific interviews/ editing/delelting specific interviews:
    manageInterviews/<int>


3. For getting all users/ creating new users:
    manageusers/
    

4. For getting specific interviews/ editing/delelting specific interviews:
    manageusers/<int>
    
5. For getting all upcoming interviews filter by a specific user:
    manageInterviews_byuser/<int:pk>/



