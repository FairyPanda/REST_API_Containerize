import React, { Component } from 'react'

import {
    Route,
    HashRouter,
  } from "react-router-dom";

import EditPage from './EditPage';
import ListPage from './ListPage';
import CreatePage from './CreatePage';

export class AdminPanel extends Component {
    
    render() {
        return (
            <div>
                <HashRouter>
                <div className="content">
                    <Route exact path="/" component={ListPage}/>
                    <Route path="/create" component={CreatePage}/>
                    <Route path="/edit/:id" component={EditPage}/>
                </div>
                </HashRouter>
            </div>
        )
    }
}

export default AdminPanel
