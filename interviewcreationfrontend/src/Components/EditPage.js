import React, { Component } from 'react'

import InterviewForm from './InterviewForm'
import InterviewDetails from './InterviewDetails'
import Errorhandler from './Errorhandler'

import { Redirect } from "react-router-dom";


export class FindPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Interview: {
                startTime: "",
                endTime: "",
                participants: [],
                deleted: false,
                edited: false,
                error: false,
                loading: false,
                statusCode: 0,
            },
        }
        this.editFunction = this.editFunction.bind(this);
        this.deleteFunction = this.deleteFunction.bind(this);
        this.setloading = this.setloading.bind(this);
    }

    setloading(val) {
        this.setState({ loading: val });
    }

    deleteFunction() {
        if (this.state.loading == true) return;
        this.setloading(true);

        var InterviewObj = new InterviewDetails();
        InterviewObj.DeleteSchedule(this.props.match.params.id, (response, error) => {

            var errorhandlerobj = new Errorhandler(error);
            errorhandlerobj.showalert(null);
            this.setloading(false);
            if (!error) {
                alert("Success.. deleted schedule");
                this.setState({ deleted: true });
            }
            else {
                this.setState({ status: error.response.status });
                this.setState({ error: true });
            }
        });
    }

    editFunction(Interview) {
        if (this.state.loading == true) return;
        this.setloading(true);

        var InterviewObj = new InterviewDetails();
        InterviewObj.UpdateSchedule(this.props.match.params.id, Interview, (response, error) => {
            var errorhandlerobj = new Errorhandler(error);
            errorhandlerobj.showalert(null);
            this.setloading(false);
            if (!error) {
                alert("Success.. schedule edited");
                this.setState({ edited: true });
            }
            else {
                this.setState({ status: error.response.status });
                this.setState({ error: true });
            }
        });
    }

    componentDidMount() {
        this.setloading(true);
        var InterviewObj = new InterviewDetails();
        InterviewObj.GetSchedule(this.props.match.params.id, (Interview, error) => {
            var errorhandlerobj = new Errorhandler(error);
            errorhandlerobj.showalert(null);
            if (!error) {
                Interview.startTime = Interview.startTime.substr(0, Interview.startTime.length - 1);
                Interview.endTime = Interview.endTime.substr(0, Interview.endTime.length - 1);
                this.setState({ Interview: Interview })
            }
            else this.setState({ status: error.response.status });
            this.setloading(false);
        });
    }

    render() {
        var delete_statement = "Delete Schedule";
        if (this.state.loading) {
            delete_statement = "Loading.. please wait (sending emails)"
        }
        if (this.state.deleted || this.state.edited || this.state.status == 404) return <Redirect to="/" />
        return (
            <div>
                <h1>Admin panel : Edit interview</h1>
                <br />
                <button className="btn btn-primary right expandFULL100"
                    onClick={this.deleteFunction}>{delete_statement}</button>
                <br /><br />
                <InterviewForm
                    Interview={this.state.Interview}
                    buttonFunction={this.editFunction}
                    buttonStatement={"Reschedule Interview"}
                    loading={this.state.loading}
                />
            </div>
        )
    }
}

export default FindPage

