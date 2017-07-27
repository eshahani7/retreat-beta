import React, { Component } from 'react';
import logo from '../img/logo.svg';
import '../stylesheets/App.css';
import { BrowserRouter, Route } from 'react-router';
import { Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to="/test">Test</Link>
      </div>
    );
  }
}
<Route exact path='/' component={App}/>

export default App;
