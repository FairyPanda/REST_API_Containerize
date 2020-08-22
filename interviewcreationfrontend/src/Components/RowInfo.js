import React, { Component } from 'react'
import {NavLink} from "react-router-dom";

export class RowInfo extends Component {

    render() {  
        var selectfielId =  "selectiongroup1"+this.props.Interview.id
        return (
            <tr className = "mainbody ">
                <td>{this.props.Interview.id}</td>
                <td>{this.props.Interview.startTime}</td>
                <td>{this.props.Interview.endTime}</td>
                <td>

                <div class="form-group">
                    <select  className="form-control marginonTop"
                        id = {selectfielId}
                        onChange = {(e)=> {
                            document.getElementById(selectfielId).value = this.props.Interview.participants.length+" participants";
                        }}>
                        
                    <option>{this.props.Interview.participants.length} participants</option>

                    {this.props.Interview.participants.map((i) => {
                        if(typeof(this.props.userCache[i]) == "undefined"){
                            return <option key={i}>User Id : {i}</option> 
                        }else{
                            return <option 
                                value = {this.props.userCache[i].username} 
                                key={i}>{this.props.userCache[i].username}</option> }                 
                        }
                    )}

                    </select>
                </div>
                </td>
                <td><NavLink to={"/edit/" + this.props.Interview.id}>Edit schedule</NavLink></td>
            </tr>
        )
    }
}

export default RowInfo
