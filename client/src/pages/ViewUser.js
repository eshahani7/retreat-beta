import React, { Component } from 'react';
import { Button, FormGroup, Form, FormControl, ControlLabel, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import '../stylesheets/ViewUser.css';

import FormField from './components/FormField.js';
import SubmitBtn from './components/SubmitBtn.js';

import { viewUser, updateUser } from '../actions/userActions.js';

import LoginControl from './components/LoginControl.js';

const mapStateToProps = (state) => {
    if(state.user.userDetails != null){
      return({
        email: state.user.userDetails.email,
        firstName: state.user.userDetails.firstName,
        lastName: state.user.userDetails.lastName,
        age: state.user.userDetails.age
      });
    }
    else{
      return({
        email: '',
        firstName: '',
        lastName: '',
        age: ''
      });
    }
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewUser: () => {dispatch(viewUser());},
    updateUser: () => {dispatch(updateUser());}
    //add fetchUser map here
  }
};

class ViewUser extends Component {
  state = {_id:'', email: '', password:'', firstName:'', lastName:'', age:0};

  componentWillMount() {
    this.props.viewUser();
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  saveChange(e) {
    e.preventDefault();
    var user = {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      password: null
    };

    console.log("Trying to update user..." + "USER: " + user);
    this.props.updateUser(user);
  }

  render() {
    return (
      <div className="ViewUser">
        <LoginControl/>
        <Row>
          <Col md={12} id="ViewUserHeader">
            YOUR PROFILE
          </Col>
        </Row>
        <Form horizontal className="ViewUserForm">
          <FormField
            className = "ViewUserField"
            title="Email"
            type="text"
            holder={this.props.email}
            name="email"
            change={this.handleChange.bind(this)}
          />
          <FormField
            className = "ViewUserField"
            title="First Name"
            type="text"
            holder={this.props.firstName}
            name="firstName"
            change={this.handleChange.bind(this)}
          />
          <FormField
            className = "ViewUserField"
            title="Last Name"
            type="text"
            holder={this.props.lastName}
            name="lastName"
            change={this.handleChange.bind(this)}
          />
          <FormField
            className = "ViewUserField"
            title="Age"
            type="number"
            holder={this.props.age}
            name="age"
            change={this.handleChange.bind(this)}
          />

          <SubmitBtn title="UPDATE" id="updateButton" submit={this.saveChange.bind(this)}/>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewUser);
