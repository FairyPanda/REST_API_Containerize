import React, { Component } from 'react'

import { NavLink } from "react-router-dom"
import InterviewDetails from './InterviewDetails'
import UserDetails from './UserDetails'
import RowInfo from './RowInfo'
import Errorhandler from './Errorhandler'


export class ListPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ScheduledInterviews: [],
            userCache: {},
            loading: 0,
        }
        this.setloading = this.setloading.bind(this);
    }


    setloading(val) {
        this.setState({ loading: this.state.loading + val });
    }


    componentDidMount() {
        var InterviewObj = new InterviewDetails();
        var UserObj = new UserDetails();

        this.setloading(2);

        InterviewObj.GetallSchedules((Interviews, error) => {
            var errorhandlerobj = new Errorhandler(error);
            errorhandlerobj.showalert(null);
            if (!error)
                this.setState({ ScheduledInterviews: Interviews })

            this.setloading(-1);
        });

        UserObj.Getallusers((Users, error) => {
            var errorhandlerobj = new Errorhandler(error);
            errorhandlerobj.showalert(null);
            if (!error)
                this.setState({ userCache: Users["Dictionary"] })
            this.setloading(-1);
        });
    }


    render() {
        var loading_message = "Loading...please wait"
        if (this.state.loading == 0) {
            loading_message = "";
        }
        return (
            <div className="App">
                <h1>Admin panel : Upcoming Interviews</h1>
                <br />
                <NavLink to="/create"><button className="btn btn-primary right expandFULL100" >Schedule new interview</button></NavLink>
                <br />
                <table>
                    <thead>
                        <tr>
                            <th>InterviewId</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Participants</th>
                            <th>Want to edit?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading_message}
                        {this.state.ScheduledInterviews.map(interview =>
                            <RowInfo key={interview.id} Interview={interview}
                                userCache={this.state.userCache} />)}
                    </tbody>
                </table>
                <br />
            </div>
        )
    }
}

export default ListPage;