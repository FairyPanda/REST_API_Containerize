import React, { Component } from 'react'

import ParticipantTable from './ParticipantTable'

export class AddParticipants extends Component {
    constructor(props) {
        super(props)
        this.AddParticipantFunction = this.AddParticipantFunction.bind(this);
        this.Useralreadyexists = this.Useralreadyexists.bind(this);
    }
    
    AddParticipantFunction(newParticipant){
        // already present
        if(this.Useralreadyexists(newParticipant.id)){
            alert("already selected");
            return;
        }
        var newParticipantsIdList = this.props.ParticipantIdList;
        newParticipantsIdList.push(newParticipant.id);
        this.props.UpdateParticipants(newParticipantsIdList);
    }

    Useralreadyexists(UserId){
        for(var i=0;i<this.props.ParticipantIdList.length;i++){
            if(this.props.ParticipantIdList[i] == UserId){
                return true;
            }
        }
        return false;
    }
    
    
    render() {
        return (
            <div class="mainbody">
                <ParticipantTable 
                    label = "Add Participant"
                    ParticipantList = {    
                        this.props.userCache.map( user =>{
                        if(this.Useralreadyexists(user.id) == false){
                            return user;
                        }
                        else{
                            return 
                        }
                    })}
                    OperationFunction = {this.AddParticipantFunction}
                    operationStatement = {"Add"}
                />
            </div>
        )
    }
}

export default AddParticipants
