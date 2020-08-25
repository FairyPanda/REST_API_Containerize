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
                callback(ScheduledInterviews, null);
            })
            .catch(function (error) {
                callback(null, error);
            })
    }

    // Get specific Interview and returns a interview objects
    GetSchedule(InterviewId, callback) {
        axios.get(process.env.REACT_APP_ManageInterviewsAPI + InterviewId + '/')
            .then(response => {
                callback(response.data, null);
            })
            .catch(function (error) {
                callback(null, error);
            })
    }

    // Deleted specific Interview 
    DeleteSchedule(InterviewId, callback) {
        axios.delete(process.env.REACT_APP_ManageInterviewsAPI + InterviewId + '/')
            .then(response => {
                callback(response.data, null);
            })
            .catch(function (error) {
                callback(null, error);
            })
    }

    UpdateSchedule(InterviewId, InterviewSchedule, callback) {
        axios({
            method: 'put',
            url: process.env.REACT_APP_ManageInterviewsAPI + InterviewId + '/',
            data: InterviewSchedule
        })
            .then(response => {
                callback(response.data, null);
            })
            .catch(function (error) {
                callback(null, error);
            })
    }

    CreateNewSchedule(InterviewSchedule, callback) {
        axios({
            method: 'post',
            url: process.env.REACT_APP_ManageInterviewsAPI,
            data: InterviewSchedule
        })
            .then(response => {
                callback(response.data, null);
            })
            .catch(function (error) {
                callback(null, error);
            })
    }

}