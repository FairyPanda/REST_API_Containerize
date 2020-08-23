import axios from 'axios';

export default class InterviewDetails {
    constructor() {
    }

    // Get all Interviews and returns a list of interview objects
    GetallSchedules(callback) {
        axios.get(process.env.REACT_APP_ManageInterviewsAPI)
            .then(response => {
                var ScheduledInterviews = [];
                response.data.map(data => {
                    ScheduledInterviews.push(data);
                })
                callback(ScheduledInterviews);
            })
            .catch(function (error) {
                error = JSON.stringify(error.response.data);
                alert("Error: \n" + error);
            })
    }

    // Get specific Interview and returns a interview objects
    GetSchedule(InterviewId, callback) {
        axios.get(process.env.REACT_APP_ManageInterviewsAPI + InterviewId + '/')
            .then(response => {
                callback(response.data);
            })
            .catch(function (error) {
                error = JSON.stringify(error.response.data);
                alert("Error: \n" + error);
            })
    }

    // Deleted specific Interview 
    DeleteSchedule(InterviewId, callback) {
        axios.delete(process.env.REACT_APP_ManageInterviewsAPI + InterviewId + '/')
            .then(response => {
                alert("Successfuly deleted");
                callback(true);
            })
            .catch(function (error) {
                error = JSON.stringify(error.response.data);
                alert("Error: \n" + error);
            })
    }

    UpdateSchedule(InterviewId, InterviewSchedule) {
        axios({
            method: 'put',
            url: process.env.REACT_APP_ManageInterviewsAPI + InterviewId + '/',
            data: InterviewSchedule
        })
            .then(response => {
                alert("Successfuly updated");
                // callback(response.data);
            })
            .catch(function (error) {
                error = JSON.stringify(error.response.data);
                alert("Error: \n" + error);
            })
    }

    CreateNewSchedule(InterviewSchedule, callback) {
        console.log(InterviewSchedule);
        axios({
            method: 'post',
            url: process.env.REACT_APP_ManageInterviewsAPI,
            data: InterviewSchedule
        })
            .then(response => {
                alert("Successfuly Created with interview ID = " + response.data.id);
                callback(response.data);
            })
            .catch(function (error) {
                error = JSON.stringify(error.response.data);
                alert("Error: \n" + error);
            })
    }

}