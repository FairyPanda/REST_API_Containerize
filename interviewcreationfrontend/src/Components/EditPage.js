import React, { Component } from 'react'

import InterviewForm from './InterviewForm'
import InterviewDetails from './InterviewDetails'

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
                loading: false
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
        InterviewObj.DeleteSchedule(this.props.match.params.id, (isSuccessfull) => {
            this.setState({ deleted: isSuccessfull });
            this.setloading(false);
        });
    }

    editFunction(Interview) {
        if (this.state.loading == true) return;
        this.setloading(true);
        var InterviewObj = new InterviewDetails();
        InterviewObj.UpdateSchedule(this.props.match.params.id, Interview, (isSuccessfull) => {
            this.setState({ edited: isSuccessfull });
            this.setloading(false);
        });
    }

    componentDidMount() {
        var InterviewObj = new InterviewDetails();
        InterviewObj.GetSchedule(this.props.match.params.id, (Interview) => {
            Interview.startTime = Interview.startTime.substr(0, Interview.startTime.length - 1);
            Interview.endTime = Interview.endTime.substr(0, Interview.endTime.length - 1);
            this.setState({ Interview: Interview })
        });
    }

    render() {
        var delete_statement = "Delete Schedule";
        if (this.state.loading) {
            delete_statement = "loading....please wait"
        }
        if (this.state.deleted || this.state.edited) return <Redirect to="/" />
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
                    loading={this.props.loading}
                />
            </div>
        )
    }
}

export default FindPage

