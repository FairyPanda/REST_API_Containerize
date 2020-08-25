import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import EmailNotifications from './EmailNotification'


export class RowInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            notifications_clickable: true
        }
        this.sendNotifications = this.sendNotifications.bind(this);
    }

    sendNotifications() {
        if (this.state.notifications_clickable == false) {
            alert("wait for some time")
            return;
        }

        this.setState({ notifications_clickable: false });

        var Emailobj = new EmailNotifications();
        Emailobj.sendNotifications(this.props.Interview.id, (response, error) => {
            if (!error) {
                this.setState({ notifications_clickable: true }, () => {
                    console.log(this.state.notifications_clickable);
                });
            }
            else {
                alert(error);
            }
        });
        alert("Notification sent");
    }

    render() {
        var selectfielId = "selectiongroup1" + this.props.Interview.id
        return (
            <tr className="mainbody ">
                <td>{this.props.Interview.id}</td>
                <td>{this.props.Interview.startTime}</td>
                <td>{this.props.Interview.endTime}</td>
                <td>

                    <div className="form-group">
                        <select className="form-control marginonTop"
                            id={selectfielId}
                            onChange={(e) => {
                                document.getElementById(selectfielId).value = this.props.Interview.participants.length + " participants";
                            }}>

                            <option>{this.props.Interview.participants.length} participants</option>

                            {this.props.Interview.participants.map((i) => {
                                if (typeof (this.props.userCache[i]) == "undefined") {
                                    return <option key={i}>User Id : {i}</option>
                                } else {
                                    return <option
                                        value={this.props.userCache[i].username}
                                        key={i}>{this.props.userCache[i].username}</option>
                                }
                            }
                            )}

                        </select>
                    </div>
                </td>
                <td><NavLink to={"/edit/" + this.props.Interview.id}>Edit schedule</NavLink></td>
                <td><div className="clickable" onClick={() => { this.sendNotifications(); }}>Send notifications</div></td>
            </tr >
        )
    }
}

export default RowInfo
