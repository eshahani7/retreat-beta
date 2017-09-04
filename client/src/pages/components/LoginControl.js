import React, { Component } from 'react';
var PublicNavBar = require('./NavBar.js').PublicNavBar;
var UserNavBar = require('./NavBar.js').UserNavBar;

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.setState({isLoggedIn: false});
  }

  render() {
    const loggedIn = this.state.isLoggedIn;
    let navbar = null;

    if(loggedIn) {
      navbar = <UserNavBar/>
    } else {
      navbar = <PublicNavBar/>
    }

    return (
      <div>
        {navbar}
      </div>
    );
  }
}

export default LoginControl;
