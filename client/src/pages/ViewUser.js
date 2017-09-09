import React, { Component } from 'react';
import { Button, FormGroup, Form, FormControl, ControlLabel, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { addUser } from '../actions/userActions.js';

import '../stylesheets/form.css';
import '../stylesheets/SignUp.css';

import FormField from './components/FormField.js';
import SubmitBtn from './components/SubmitBtn.js';

var PublicNavBar = require('./components/NavBar.js').PublicNavBar;

class ViewUser extends Component {
  state = {_id:'', email: '', password:'', firstName:'', lastName:'', age:0};

  componentWillMount() {
    var token = sessionStorage.getItem('authToken');
    var userHeader = new Headers();
    userHeader.append('x-auth', token);

    fetch('/users/me', {
      method: 'GET',
      headers: userHeader
    }).then((res) => {
      return res.json();
    }).then((body) => {
      this.setState({
        _id: body._id,
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        age: body.age
      });
    }).catch((e) => {
      console.log(e);
    });
  }

  render() {
    return (
      <div className="ViewUser">
        <PublicNavBar/>
        <Row>
          <Col md={12} id="ViewUserHeader">
            JOIN RETREAT!
          </Col>
        </Row>
        <Form horizontal className="ViewUserForm">
          <FormField
            title="Email"
            type="text"
            holder="janedoe@gmail.com"
            name="email"
            change={this.handleChange.bind(this)}
          />
          <FormField
            title="Password"
            type="password"
            holder="password"
            name="password"
            change={this.handleChange.bind(this)}
          />
          <FormField
            title="First Name"
            type="text"
            holder="Jane"
            name="firstName"
            change={this.handleChange.bind(this)}
          />
          <FormField
            title="Last Name"
            type="text"
            holder="Doe"
            name="lastName"
            change={this.handleChange.bind(this)}
          />
          <FormField
            title="Age"
            type="number"
            holder="21"
            name="age"
            change={this.handleChange.bind(this)}
          />
          <FormField
            title="Gender"
            type="text"
            holder="F"
            name="gender"
            change={this.handleChange.bind(this)}
          />

          <SubmitBtn title="UPDATE" id="UpdateUserButton" submit={this.addNewUser.bind(this)}/>
        </Form>
      </div>
    );
  }
}

export default ViewUser;
