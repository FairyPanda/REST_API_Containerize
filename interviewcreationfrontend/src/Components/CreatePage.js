import React, { Component } from 'react'


import InterviewForm from './InterviewForm'
import InterviewDetails from './InterviewDetails'
import Errorhandler from './Errorhandler'

import { Redirect } from "react-router-dom";

export class CreatePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Interview: {
                startTime: "",
                endTime: "",
                participants: [],
                created: false,
                loading: false
            },
        }
        this.buttonFunction = this.buttonFunction.bind(this);
        this.setloading = this.setloading.bind(this);
    }


    setloading(val) {
        this.setState({ loading: val });
    }

    buttonFunction(Interview) {
        if (this.state.loading == true) return;
        this.setloading(true);

        var InterviewObj = new InterviewDetails();
        InterviewObj.CreateNewSchedule(Interview, (response, error) => {
            var errorhandlerobj = new Errorhandler(error);
            errorhandlerobj.showalert(null);
            this.setloading(false);
            if (!error) {
                console.log(response);
                alert("Success.. Created schedule with id = " + response.id);
                this.setState({ created: true });
            }
        })
    }


    render() {
        if (this.state.created) return <Redirect to="/" />
        return (
            <div>
                <h1>Admin panel : Create interview</h1>
                <InterviewForm
                    Interview={this.state.Interview}
                    buttonFunction={this.buttonFunction}
                    buttonStatement={"Schedule Interview"}
                    loading={this.state.loading}
                />
            </div>
        )
    }
}

export default CreatePage


