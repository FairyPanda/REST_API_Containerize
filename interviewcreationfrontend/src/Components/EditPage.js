import React, { Component } from 'react'

import InterviewForm from './InterviewForm'
import InterviewDetails from './InterviewDetails'

import {Redirect} from "react-router-dom";


export class FindPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Interview : {
                startTime : "",
                endTime : "",
                participants : [],
                deleted : false
            },
        }
        this.editFunction = this.editFunction.bind(this);
        this.deleteFunction = this.deleteFunction.bind(this);
    }

    deleteFunction(){
        var InterviewObj = new InterviewDetails();
        InterviewObj.DeleteSchedule(this.props.match.params.id, (isSuccessfull)=>{
            this.setState({ deleted : isSuccessfull });
        });
    }
    
    editFunction(Interview){
        var InterviewObj = new InterviewDetails();
        InterviewObj.UpdateSchedule(this.props.match.params.id, Interview);
    }

    componentDidMount(){
        var InterviewObj = new InterviewDetails();
        InterviewObj.GetSchedule(this.props.match.params.id,  (Interview) => {
            Interview.startTime = Interview.startTime.substr(0,Interview.startTime.length-1);
            Interview.endTime = Interview.endTime.substr(0,Interview.endTime.length-1);
            this.setState({ Interview : Interview })
        });
    }

    render() {
            if(this.state.deleted) return <Redirect to="/" />
        return (
            <div>
                
                <h1>Admin panel : Edit interview</h1>
                <br/>
                <button className="btn btn-primary right expandFULL100" 
                    onClick={this.deleteFunction}>Delete Schedule</button>
                <br/><br/>
                <InterviewForm
                    Interview = {this.state.Interview}
                    buttonFunction = {this.editFunction}
                    buttonStatement = {"Reschedule Interview"}
                />
            </div>
        )
    }
}

export default FindPage

