import React, { Component } from 'react';
import { Button, FormGroup, Form, FormControl, ControlLabel, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import '../stylesheets/ViewUser.css';

import FormField from './components/FormField.js';
import SubmitBtn from './components/SubmitBtn.js';

import { viewUser } from '../actions/userActions.js';

import LoginControl from './components/LoginControl.js';

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

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  saveChange(e) {
    e.preventDefault();
    fetch('/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json',
        'x-auth': sessionStorage.getItem('authToken')
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        age: this.state.age
      })
    });
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
            title="Email"
            class = "ViewUserField"
            type="text"
            holder={this.state.email}
            name="email"
            change={this.handleChange.bind(this)}
          />
          <FormField
            title="First Name"
            type="text"
            holder={this.state.firstName}
            name="firstName"
            change={this.handleChange.bind(this)}
          />
          <FormField
            title="Last Name"
            type="text"
            holder={this.state.lastName}
            name="lastName"
            change={this.handleChange.bind(this)}
          />
          <FormField
            title="Age"
            type="number"
            holder={this.state.age}
            name="age"
            change={this.handleChange.bind(this)}
          />

          <SubmitBtn title="UPDATE" id="updateButton" submit={this.saveChange.bind(this)}/>
        </Form>
      </div>
    );
  }
}

export default ViewUser;
