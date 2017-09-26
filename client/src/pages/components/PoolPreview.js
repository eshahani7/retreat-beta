import React, { Component } from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { findUser } from '../../actions/userActions';

import NavLink from './Link';

const mapStateToProps = (state ) => {
  console.log("STATE: " + state);
  return {
    hostInfo: state.user.userInfo,
    hostFirstName: state.user.userInfo.firstName,
    hostLastName: state.user.userInfo.lastName,
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
    console.log("HOST: " + this.props.host);
    this.props.findUser(this.props.host);
  }

  render() {

    var startDate = new Date(this.props.startDate);
    var endDate = new Date(this.props.endDate);

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
