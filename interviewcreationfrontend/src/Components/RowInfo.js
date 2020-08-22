import React, { Component } from 'react'
import {NavLink} from "react-router-dom";

export class RowInfo extends Component {

    render() {        
        return (
            <tr className = "mainbody ">
                <td>{this.props.Interview.id}</td>
                <td>{this.props.Interview.startTime}</td>
                <td>{this.props.Interview.endTime}</td>
                <td>
                <select className="form-control selectbox">
                    <option>{this.props.Interview.participants.length} participants</option>
                    {this.props.Interview.participants.map((i) => { 
                        if(typeof(this.props.userCache[i]) == "undefined"){
                            return <option key={i}>User Id : {i}</option> 
                        }else{
                            return <option key={i}>{this.props.userCache[i].username}</option> }                 
                        }
                    )}
                </select>
                </td>
                <td><NavLink to={"/edit/" + this.props.Interview.id}>Edit schedule</NavLink></td>
            </tr>
        )
    }
}

export default RowInfo
