import React, { Component } from 'react'

import ParticipantTable from './ParticipantTable'

export class EditParticipant extends Component {
    constructor(props) {
        super(props)
        this.deleteParticipant = this.deleteParticipant.bind(this);
    }
    
    deleteParticipant(participant){
        // console.log(participant)
        var NewParticipantIdList = [];
        for(var i=0;i<this.props.ParticipantIdList.length;i++){
            if(this.props.ParticipantIdList[i] != participant.id){
                NewParticipantIdList.push(this.props.ParticipantIdList[i]);
            }
        }
        // console.log(NewParticipantIdList);
        this.props.UpdateParticipants(NewParticipantIdList);
    }

    render() {
        return (
            <div> 
                <ParticipantTable 
                    label = "Selected Participants"
                    ParticipantList = {this.props.ParticipantIdList.map( Id =>{
                        return this.props.userDict[Id]
                    })}
                    OperationFunction = {this.deleteParticipant}
                    operationStatement = {"Remove"}
                />
            </div>
        )
    }
}

export default EditParticipant


