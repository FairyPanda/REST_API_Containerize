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
        this.editFunction = this.editFunction.bind(this);
        this.deleteFunction = this.deleteFunction.bind(this);
    }

    deleteFunction(){

    }
    
    editFunction(Interview){
        
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

