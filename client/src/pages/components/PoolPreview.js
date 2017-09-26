import React, { Component } from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { findUser } from '../../actions/userActions';

import NavLink from './Link';

const mapStateToProps = (state ) => {
  return {
    hostInfo: state.user.userInfo,
    hostFirstName: state.user.userInfo.firstName,
    hostLastName: state.user.userInfo.lastName,
    found: state.user.found
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      findUser: (userID) =>{ dispatch(findUser(userID))}
  };
};

class PoolPreview extends Component {
  onSelect() {
    console.log(this.props.id);
    this.props.select(this.props.id);
  }

  componentWillMount(){
    var response = this.props.findUser(this.props.host);
  }

  render() {

    var startDate = new Date(this.props.startDate);
    var endDate = new Date(this.props.endDate);
    console.log("HOST INFO: " + this.props.hostInfo.firstName);
    return(
      <Panel className={this.props.className}>
        <strong>{this.props.location}</strong><br/>
        {startDate.toDateString()}<br/>
        {endDate.toDateString()}<br/>
        host: {this.props.hostFirstName + " " + this.props.hostLastName}<br/>
      <NavLink target={this.props.linkTarget} name="Details"/>
      </Panel>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PoolPreview);
