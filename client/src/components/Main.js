import React, { Component } from 'react';
import logo from '../img/logo.svg';
import '../stylesheets/Main.css';
import { BrowserRouter, Route } from 'react-router';
import { Link } from 'react-router-dom'

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <div className="Main-header">
          <img src={logo} className="Main-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="Main-intro">
          To get started, edit <code>src/Main.js</code> and save to reload.
        </p>
        <Link to="/test">Test</Link>
      </div>
    );
  }
}
<Route exact path='/' component={Main}/>

export default Main;
