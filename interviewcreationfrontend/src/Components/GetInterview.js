import axios from 'axios';

export default class InterviewDetails{
    constructor() {
    }

    // Get all Interviews and returns a list of interview objects
    GetallSchedules(callback){
        axios.get(process.env.REACT_APP_ManageInterviewsAPI)
        .then( response =>  {
            var ScheduledInterviews = [];
            response.data.map( data => {
                ScheduledInterviews.push(data);
            })
            callback(ScheduledInterviews);
        } )
        .catch(function (error) {
            alert(error); 
        })
    }

    // Get specific Interview and returns a interview objects
    GetSchedule(InterviewId, callback){
        axios.get(process.env.REACT_APP_ManageInterviewsAPI+InterviewId)
        .then( response =>  {
            callback(response.data);
        } )
        .catch(function (error) {
            alert(error); 
        })
    }
}