import React, { Component } from 'react';
import './App.css';
import AdminPanel from './Components/AdminPanel';

require('dotenv').config()



export class App extends Component {

  
  render() {
    return (
      <div className="App">
        <AdminPanel/>
      </div>
    )
  }
}

export default App;