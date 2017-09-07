import React, { Component } from 'react';
import { Button, FormGroup, Form, FormControl, ControlLabel, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import { addUser } from '../actions/userActions.js';

import '../stylesheets/form.css';
import '../stylesheets/SignUp.css';

import FormField from './components/FormField.js';
import SubmitBtn from './components/SubmitBtn.js';

var PublicNavBar = require('./components/NavBar.js').PublicNavBar;

class SignUp extends Component {

  state = {email:'', password:'', firstName:'', lastName:'', gender:'', age:null};

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  addNewUser(e) {
    e.preventDefault();
    var user = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      gender: this.state.gender
    };

    this.props.dispatch(addUser(user));

    //REMOVE LATER, SHOULD JUST REDIRECT TO NEW PAGE
    this.setState({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      age: null,
      gender: ''
    });
  }

  render() {
    return (
      <div className="SignUp">
        <PublicNavBar/>
        <Row>
          <Col md={12} className="SignUpHeader">
            JOIN RETREAT!
          </Col>
        </Row>
        <Form horizontal className="signUpForm">
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

          <SubmitBtn title="SignUp" submit={this.addNewUser.bind(this)}/>
        </Form>
      </div>
    );
  }
}

export default connect()(SignUp);
