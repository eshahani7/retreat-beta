import React, { Component } from 'react';
import { connect } from 'react-redux';

var PublicNavBar = require('./NavBar.js').PublicNavBar;
var UserNavBar = require('./NavBar.js').UserNavBar;

const mapStateToProps = function(state){
  return {
    loggedIn: state.user.loggedIn,
  }
}

class LoginControl extends React.Component {
  componentDidMount() {
    console.log(this.props.loggedIn);
  }
  render() {
    let navbar = null;

    if(this.props.loggedIn) {
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

export default connect(mapStateToProps)(LoginControl);
