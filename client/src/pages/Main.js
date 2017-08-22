import React, { Component } from 'react';

import '../stylesheets/Main.css';
import RNavBar from './components/RNavBar.js'

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <RNavBar/>
        <p className="Main-intro">
          To get started, edit <code>src/Main.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Main;
