import React, { Component } from 'react';

import '../stylesheets/Main.css';
var PublicNavBar = require('./components/NavBar.js').PublicNavBar;
var UserNavBar = require('./components/NavBar.js').UserNavBar;

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <PublicNavBar/>
        <p className="Main-intro">
          To get started, edit <code>src/Main.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Main;
