import React, { Component } from 'react'

import ParticipantTable from './ParticipantTable'

export class AddParticipants extends Component {
    constructor(props) {
        super(props)
        this.AddParticipantFunction = this.AddParticipantFunction.bind(this);
    }
    
    AddParticipantFunction(newParticipant){
        // already present
        var oldParticipantsIdList = this.props.ParticipantIdList;
        for(var i=0;i<oldParticipantsIdList.length;i++){
            if(oldParticipantsIdList[i] == newParticipant.id){
                alert("Already Selected");
                return;
            }
        }
        oldParticipantsIdList.push(newParticipant.id);
        var newParticipantsIdList = oldParticipantsIdList;
        this.props.UpdateParticipants(newParticipantsIdList);
    }
    
    render() {
        return (
            <div class="mainbody">
                <ParticipantTable 
                    ParticipantList = {this.props.userCache}
                    OperationFunction = {this.AddParticipantFunction}
                    operationStatement = {"Add"}
                />
            </div>
        )
    }
}

export default AddParticipants
