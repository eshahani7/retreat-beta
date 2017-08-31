import React, { Component } from 'react';
import { Button, FormGroup, Form, FormControl, ControlLabel, Col, Row } from 'react-bootstrap';
import '../stylesheets/form.css';
import FormField from './components/FormField.js';

var PublicNavBar = require('./components/NavBar.js').PublicNavBar;
var UserNavBar = require('./components/NavBar.js').UserNavBar;

class SignUp extends Component {

  state = {email:'', password:'', firstName:'', lastName:'', gender:'', age:null};

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  submitDetails(e) {
    e.preventDefault();
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        age: this.state.age,
        gender: this.state.gender
      })
    }).then((res) => {
      sessionStorage.setItem('authToken', res.headers.get('x-auth'));
    }).catch((e) => {
      console.log(e);
    });

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
        <Form horizontal className="signUpForm">
          <FormGroup controlId="formEmail">
            <Col componentClass={ControlLabel} sm={4}>
              Email
            </Col>
            <Col sm={4}>
              <FormControl
                type="email"
                placeholder="janedoe@gmail.com"
                value={this.state.email}
                name="email"
                onChange={this.handleChange.bind(this)}
                 />
            </Col>
          </FormGroup>

          <FormGroup controlId="formPassword">
            <Col componentClass={ControlLabel} sm={4}>
              Password
            </Col>
            <Col sm={4}>
              <FormControl
                type="password"
                placeholder="password"
                value={this.state.password}
                name="password"
                onChange={this.handleChange.bind(this)}
                />
            </Col>
          </FormGroup>

          <FormGroup controlId="formFirstName">
            <Col componentClass={ControlLabel} sm={4}>
              First Name
            </Col>
            <Col sm={4}>
              <FormControl
                type="text"
                placeholder="Jane"
                value={this.state.firstName}
                name="firstName"
                onChange={this.handleChange.bind(this)}
                />
            </Col>
          </FormGroup>

          <FormGroup controlId="formLastName">
            <Col componentClass={ControlLabel} sm={4}>
              Last Name
            </Col>
            <Col sm={4}>
              <FormControl
                type="text"
                placeholder="Doe"
                value={this.state.lastName}
                name="lastName"
                onChange={this.handleChange.bind(this)}
                />
            </Col>
          </FormGroup>

          <FormGroup controlId="formAge">
            <Col componentClass={ControlLabel} sm={4}>
              Age
            </Col>
            <Col sm={4}>
              <FormControl
                type="number"
                placeholder= "21"
                value={this.state.age}
                name="age"
                onChange={this.handleChange.bind(this)}
                />
            </Col>
          </FormGroup>

          <FormGroup controlId="formGender">
            <Col componentClass={ControlLabel} sm={4}>
              Gender
            </Col>
            <Col sm={4}>
              <FormControl
                type="text"
                placeholder= "F"
                value={this.state.gender}
                name="gender"
                onChange={this.handleChange.bind(this)}
                />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={4} sm={4}>
              <Button type="submit" onClick={this.submitDetails.bind(this)} block>
                Sign Up
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default SignUp;
