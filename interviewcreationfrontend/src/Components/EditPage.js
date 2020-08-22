import React, { Component } from 'react'

import InterviewForm from './InterviewForm'
import InterviewDetails from './GetInterview'

export class FindPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Interview : {
                startTime : "",
                endTime : "",
                participants : []
            },
        }
        this.buttonFunction = this.buttonFunction.bind(this);
    }
    
    buttonFunction(Interview){
        
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
        return (
            <div>
                <h1>Admin panel : Edit interview</h1>
                <InterviewForm
                    Interview = {this.state.Interview}
                    buttonFunction = {this.buttonFunction}
                    buttonStatement = {"Reschedule Interview"}
                />
            </div>
        )
    }
}

export default FindPage

