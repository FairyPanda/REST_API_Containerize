import React, { Component } from 'react'


import AddParticipants from './AddParticipants'
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
            userCache : [],
            userDict : {},
        }
        this.UpdateParticipants = this.UpdateParticipants.bind(this);
    }
    
    UpdateParticipants(newParticipants){
        var NewSchedule = this.state.ScheduledInterview;
        NewSchedule.participants = newParticipants;
        this.setState({
            ScheduledInterview : NewSchedule
        },()=>{
            console.log(this.state.ScheduledInterview.participants);
        })
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
            this.setState({  userCache : Users["list"] , userDict : Users["Dictionary"] })
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
                
                Selected participants:
                <br/> <br/>

                <EditParticipant 
                    userDict = {this.state.userDict}
                    ParticipantIdList = {this.state.ScheduledInterview.participants} 
                    UpdateParticipants = {this.UpdateParticipants}/>

                <br/> <br/>

                All participants:
                <br/> <br/>

                <AddParticipants 
                    userCache = {this.state.userCache}
                    ParticipantIdList = {this.state.ScheduledInterview.participants}
                    UpdateParticipants = {this.UpdateParticipants}/>
                

                <br/> <br/> <br/> <br/>

                <button className="btn btn-primary">Confirm editing</button>
                
                </div>
            </div>
        )
    }
}

export default EditPage


