import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router';

class Test extends Component {
  render() {
    return (
      <div className="Test">
        <div className="Test-header">
          <h2>Welcome to Test</h2>
        </div>
        <p className="Test-message">
          I hope this rendered.
        </p>
      </div>
    );
  }
}

<Route path='/test' component={Test}/>

export default Test;
