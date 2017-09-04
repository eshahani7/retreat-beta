import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addUser } from '../actions/userActions.js';

class Test extends Component {
  addNewUser(e) {
    e.preventDefault();
    var user = {
      email:'reduxtest@gmail.com',
      password: 'fakepass',
      firstName: 'Redux',
      lastName: 'Test',
      age: 22,
      gender: 'M'
    };

    this.props.dispatch(addUser(user));
    console.log(user)
  }

  render() {
    return (
      <div className="Test">
        <div className="Test-header">
          <h2>Welcome to Test</h2>
        </div>
        <button onClick={this.addNewUser.bind(this)}>Submit</button>
      </div>
    );
  }
}

export default connect()(Test);
