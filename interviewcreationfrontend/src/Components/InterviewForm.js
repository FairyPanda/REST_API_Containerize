import React, { Component } from 'react'


import AddParticipants from './AddParticipants'
import EditParticipant from './EditParticipant'
import UserDetails from './UserDetails'


export class InterviewForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Interview: {
                startTime: "",
                endTime: "",
                participants: []
            },
            userCache: [],
            userDict: {},
        }
        this.UpdateParticipants = this.UpdateParticipants.bind(this);
    }

    UpdateParticipants(newParticipants) {
        var NewSchedule = this.state.Interview;
        NewSchedule.participants = newParticipants;
        this.setState({ Interview: NewSchedule })
    }

    componentDidMount() {
        var UserObj = new UserDetails();
        UserObj.Getallusers((Users) => {
            this.setState({ userCache: Users["list"], userDict: Users["Dictionary"] })
        });
    }


    render() {
        var modifiedbuttonstatement = this.props.buttonStatement;
        if (this.props.loading) {
            modifiedbuttonstatement = "Loading.. please wait"
        }
        if (this.props.Interview.startTime != "" && this.state.Interview.startTime == "")
            this.setState({ Interview: this.props.Interview })
        return (
            <div>
                <div className="mainbody">
                    <div className="form-group row col-10 ">
                        <label className="col-2 col-form-label expand">Start time </label>
                        <input className="form-control expandInputboxes" type="datetime-local"
                            onChange={e => {
                                var newInterview = this.state.Interview;
                                newInterview.startTime = e.target.value;
                                this.setState({ Interview: newInterview })
                            }}
                            value={this.state.Interview.startTime}
                        />
                    </div>

                    <div className="form-group row col-10 ">
                        <label className="col-2 col-form-label">End time </label>
                        <input className="form-control expandInputboxes" type="datetime-local"
                            onChange={e => {
                                var newInterview = this.state.Interview;
                                newInterview.endTime = e.target.value;
                                this.setState({ Interview: newInterview })
                            }}
                            value={this.state.Interview.endTime}
                        />
                    </div>

                    <br />

                    <div className="form-group row col-10 expandFULL100">
                        <div className="expandFULL100">
                            <EditParticipant
                                userDict={this.state.userDict}
                                ParticipantIdList={this.state.Interview.participants}
                                UpdateParticipants={this.UpdateParticipants} />
                        </div>
                    </div>

                    <br />

                    <div className="form-group row col-10 ">
                        <div className="expandFULL100">
                            <AddParticipants
                                userCache={this.state.userCache}
                                ParticipantIdList={this.state.Interview.participants}
                                UpdateParticipants={this.UpdateParticipants} />
                        </div>
                    </div>


                    <br /> <br />

                    <div>
                        <button className="btn btn-primary right expandFULL100"
                            onClick={() => this.props.buttonFunction(this.state.Interview)}>{modifiedbuttonstatement}</button>
                    </div>

                    <br /> <br />
                </div>
            </div>
        )
    }
}

export default InterviewForm
