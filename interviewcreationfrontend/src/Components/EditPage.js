import React, { Component } from 'react'


import AutoSuggester from './AutoSuggester'
import EditParticipant from './EditParticipant'
import InterviewDetails from './GetInterview'
import UserDetails from './GetUsers'

export class EditPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ScheduledInterview : {
                startTime : "",
                endTime : "",
                participants : []
            },
            userCache : {},
        }
        this.UpdateParticipants = this.UpdateParticipants.bind(this);
        this.AddParticipant = this.AddParticipant.bind(this);
    }
    
    
    UpdateParticipants(newParticipants){
        var NewSchedule = this.state.ScheduledInterview;
        NewSchedule.participants = newParticipants;
        this.setState({
            ScheduledInterview : NewSchedule
        })
    }

    AddParticipant(newParticipant){
        // already present
        var oldParticipants = this.state.ScheduledInterview.participants;
        for(var i=0;i<oldParticipants.length();i++){
            if(oldParticipants[i] == newParticipant)return;
        }
        var newParticipants = oldParticipants.push(newParticipant);
        this.UpdateParticipants(newParticipants);
    }

    componentDidMount(){
        var InterviewObj = new InterviewDetails();
        var UserObj = new UserDetails();

        InterviewObj.GetSchedule(this.props.match.params.id,  (Interview) => {
            
            Interview.startTime = Interview.startTime.substr(0,Interview.startTime.length-1);
            Interview.endTime = Interview.endTime.substr(0,Interview.endTime.length-1);

            this.setState({ ScheduledInterview : Interview })
        });
        
        UserObj.Getallusers((Users) => {
            this.setState({  userCache : Users })
        });

    }

    render() {
        return (
            <div>
                <h1>Admin panel : Edit interview</h1>

                <div className="mainbody">

                <div className="form-group row col-10 ">
                    <label className="col-2 col-form-label expand">Start time </label>
                    <input className="form-control expandInputboxes" type="datetime-local" 
                        onChange = { e => { console.log(e.target.value); this.setState({startTime : e.target.value}) }}
                        value = {this.state.ScheduledInterview.startTime}
                    />
                    <br/><br/>
                </div>
                
                <div className="form-group row col-10 ">
                    <label  className="col-2 col-form-label">End time </label>
                    <input className="form-control expandInputboxes" type="datetime-local" 
                        onChange = { e => { this.setState({endTime : e.target.value}) }}
                        value = {this.state.ScheduledInterview.endTime}
                    />
                    <br/><br/>
                </div>
                
                <EditParticipant 
                    userCache = {this.state.userCache}
                    ParticipantList = {this.state.ScheduledInterview.participants} 
                    UpdateParticipants = {this.UpdateParticipants}/>

                {/* <AutoSuggester 
                    userCache = {this.state.userCache}
                    AddParticipant = {this.AddParticipant}/> */}
                <br/>
                <br/>
                <br/>
                <br/>
                <button className="btn btn-primary">Confirm editing</button>
                </div>
            </div>
        )
    }
}

export default EditPage


