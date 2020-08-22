import React, { Component } from 'react'

export class EditParticipant extends Component {
    constructor(props) {
        super(props)
        this.deleteParticipant = this.deleteParticipant.bind(this);
    }
    
    deleteParticipant(participantId){
        var NewParticipantList = []
        this.props.ParticipantList.map( oldparticipantId => {
            if(oldparticipantId != participantId){
                NewParticipantList.push(oldparticipantId);
            }
        })
        this.props.UpdateParticipants(NewParticipantList);
    }

    render() {
        return (
            <div> 
                <div className="form-group row col-10 ">
                    <table>
                        <thead>
                            <tr>
                                <th>Participant Id</th>
                                <th>Participant username</th>
                                <th>Participant coloumn</th>
                                <th>Delete Participant</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.ParticipantList.map( (ParticipantId) => 
                                <ParticipantRow key={ParticipantId} 
                                    participant = {this.props.userCache[ParticipantId]}
                                    deleteParticipant = {this.deleteParticipant}
                                />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default EditParticipant

class ParticipantRow extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <tr>
                <td>{this.props.participant.id}</td>
                <td>{this.props.participant.username}</td>
                <td>{this.props.participant.email}</td>
                <td className="clickable" onClick = {this.props.deleteParticipant(this.props.participant.id)}>Remove</td>
            </tr>
        )
    }
}

