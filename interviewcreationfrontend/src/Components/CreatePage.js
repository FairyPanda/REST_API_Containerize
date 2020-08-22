import React, { Component } from 'react'


import InterviewForm from './InterviewForm'
import InterviewDetails from './InterviewDetails'

import {Redirect} from "react-router-dom";

export class CreatePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Interview : {
                startTime : "",
                endTime : "",
                participants : [],
                created : false
            },
        }
        this.buttonFunction = this.buttonFunction.bind(this);
    }
    
    buttonFunction(Interview){
        var InterviewObj = new InterviewDetails();
        InterviewObj.CreateNewSchedule(Interview, (isSuccessfull)=>{
            this.setState({ created : isSuccessfull });
        })
    }


    render() {
        if(this.state.created) return <Redirect to="/" />
        return (
            <div>
                <h1>Admin panel : Create interview</h1>
                <InterviewForm
                    Interview = {this.state.Interview}
                    buttonFunction = {this.buttonFunction}
                    buttonStatement = {"Schedule Interview"}
                />
            </div>
        )
    }
}

export default CreatePage


