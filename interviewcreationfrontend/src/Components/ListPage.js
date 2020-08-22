import React, { Component } from 'react'

import {NavLink} from "react-router-dom"; 
import InterviewDetails from './InterviewDetails'
import UserDetails from './UserDetails'
import RowInfo from './RowInfo';


export class ListPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
             ScheduledInterviews : [],
             userCache : {},
        }
    }

    componentDidMount(){
        var InterviewObj = new InterviewDetails();
        var UserObj = new UserDetails();

        InterviewObj.GetallSchedules((Interviews) => {
            this.setState({ ScheduledInterviews : Interviews })
        });

        UserObj.Getallusers((Users) => {
            this.setState({  userCache : Users["Dictionary"] })
        });
    }
    
    
    render() {
        return (
            <div className = "App">
                <h1>Admin panel : Upcoming Interviews</h1>
                <br/>
                <NavLink to="/create"><button className="btn btn-primary right expandFULL100" >Schedule new interview</button></NavLink>
                <br/>
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
                        {this.state.ScheduledInterviews.map( interview => 
                        <RowInfo key = {interview.id} Interview = {interview} 
                        userCache = {this.state.userCache} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ListPage;