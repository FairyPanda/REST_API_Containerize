import React, { Component } from 'react'


import InterviewForm from './InterviewForm'

export class CreatePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Interview : {
                startTime : "",
                endTime : "",
                participants : []
            },
        }
        this.buttonFunction = this.buttonFunction.bind(this);
    }
    
    buttonFunction(Interview){
        
    }


    render() {
        return (
            <div>
                <h1>Admin panel : Create interview</h1>
                <InterviewForm
                    Interview = {this.state.Interview}
                    buttonFunction = {this.buttonFunction}
                    buttonStatement = {"Schedule Interview"}
                />
            </div>
        )
    }
}

export default CreatePage


