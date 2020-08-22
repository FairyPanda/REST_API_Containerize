import React, { Component } from 'react'

export class ParticipantTable extends Component {
    render() {
        return (
            <div>
                 <table>
                    <thead>
                        <tr>
                            <th>Participant Id</th>
                            <th>Participant username</th>
                            <th>Participant coloumn</th>
                            <th>{this.props.operationStatement} Participant</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.ParticipantList.map( (Participant) => 
                            <ParticipantRow 
                                key={Participant.id} 
                                participant = {Participant}
                                OperationFunction = {this.props.OperationFunction}
                                operationStatement = {this.props.operationStatement}
                            />
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ParticipantTable


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
                <td className="clickable" onClick = {()=>this.props.OperationFunction(this.props.participant)}>
                    {this.props.operationStatement}
                </td>
            </tr>
        )
    }
}