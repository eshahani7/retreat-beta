import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/userActions.js'

var PublicNavBar = require('../components/NavBar.js').PublicNavBar;
var UserNavBar = require('../components/NavBar.js').UserNavBar;

const mapStateToProps = (state ) => {
  return {
    loggedIn: state.user.loggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => { dispatch(logoutUser()); },
  }
};

class LoginControl extends React.Component {
  render() {
    let navbar = null;

    if(this.props.loggedIn) {
      navbar = <UserNavBar logout={() => {this.props.logoutUser()}}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginControl);
