import axios from 'axios'

export default class EmailNotifications {
    constructor() {

    }
    sendNotifications(InterviewId, callback) {
        axios.get(process.env.REACT_APP_EmailNotifications + InterviewId + '/')
            .then(response => {
                callback(response.data, null);
            })
            .catch(function (error) {
                callback(null, error);
            })
    }
}