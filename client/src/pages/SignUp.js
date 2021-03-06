import React, { Component } from 'react';
import { Button, FormGroup, Form, FormControl, ControlLabel, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import { addUser } from '../actions/userActions.js';

import '../stylesheets/form.css';
import '../stylesheets/SignUp.css';

import FormField from './components/FormField.js';
import SubmitBtn from './components/SubmitBtn.js';
import LoginControl from './components/LoginControl.js';

var PublicNavBar = require('./components/NavBar.js').PublicNavBar;

const Loading = require('react-loading-animation');

const mapStateToProps = (state ) => {
  return {
    adding: state.user.adding,
    added: state.user.added,
    addFailed: state.user.addFailed
  }
}

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
      gender: this.state.gender,
      isAdmin: false
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
    if(this.props.adding){
      return (
        <div className="SignUp">
          <PublicNavBar/>
          <Row>
            <Col md={12} id="SignUpHeader">
              JOIN RETREAT!
            </Col>
          </Row>

          <Form horizontal className="signUpForm">
            <FormField
              className= "signUpField"
              title="Email"
              type="text"
              holder="janedoe@gmail.com"
              name="email"
              change={this.handleChange.bind(this)}
            />
            <FormField
              className= "signUpField"
              title="Password"
              type="password"
              holder="password"
              name="password"
              change={this.handleChange.bind(this)}
            />
            <FormField
              className= "signUpField"
              title="First Name"
              type="text"
              holder="Jane"
              name="firstName"
              change={this.handleChange.bind(this)}
            />
            <FormField
              className= "signUpField"
              title="Last Name"
              type="text"
              holder="Doe"
              name="lastName"
              change={this.handleChange.bind(this)}
            />
            <FormField
              className= "signUpField"
              title="Age"
              type="number"
              holder="21"
              name="age"
              change={this.handleChange.bind(this)}
            />
            <FormField
              className= "signUpField"
              title="Gender"
              type="text"
              holder="F"
              name="gender"
              change={this.handleChange.bind(this)}
            />

            <SubmitBtn title="SIGN UP" id="SignUpButton" submit={this.addNewUser.bind(this)}/>
            <Loading/>
          </Form>
        </div>
      );
    }
    else if (this.props.added){
      return(
        <div className="SignUp">
        <LoginControl/>
        <Row>
          <Col md={12} id="SignUpHeader">
            CONGRATULATIONS ON JOINING RETREAT!
          </Col>
        </Row>
        <Row id="signUpBottom">
          <Button id="letsGetStarted" href="/">LETS GET STARTED!</Button>
        </Row>
        </div>
      );
    }
    else if (this.props.addFailed){
      return (
        <div className="SignUp">
          <PublicNavBar/>
          <Row>
            <Col md={12} id="SignUpHeader">
              SIGN UP FAILED. PLEASE TRY AGAIN
            </Col>
          </Row>

          <Form horizontal className="signUpForm">
            <FormField
              className= "signUpField"
              title="Email"
              type="text"
              holder="janedoe@gmail.com"
              name="email"
              change={this.handleChange.bind(this)}
            />
            <FormField
              className= "signUpField"
              title="Password"
              type="password"
              holder="password"
              name="password"
              change={this.handleChange.bind(this)}
            />
            <FormField
              className= "signUpField"
              title="First Name"
              type="text"
              holder="Jane"
              name="firstName"
              change={this.handleChange.bind(this)}
            />
            <FormField
              className= "signUpField"
              title="Last Name"
              type="text"
              holder="Doe"
              name="lastName"
              change={this.handleChange.bind(this)}
            />
            <FormField
              className= "signUpField"
              title="Age"
              type="number"
              holder="21"
              name="age"
              change={this.handleChange.bind(this)}
            />
            <FormField
              className= "signUpField"
              title="Gender"
              type="text"
              holder="F"
              name="gender"
              change={this.handleChange.bind(this)}
            />

            <SubmitBtn title="SIGN UP" id="SignUpButton" submit={this.addNewUser.bind(this)}/>
          </Form>
        </div>
      );
    }
    else{
      return (
        <div className="SignUp">
          <PublicNavBar/>
          <Row>
            <Col md={12} id="SignUpHeader">
              JOIN RETREAT!
            </Col>
          </Row>

          <Form horizontal className="signUpForm">
            <FormField
              className= "signUpField"
              title="Email"
              type="text"
              holder="janedoe@gmail.com"
              name="email"
              change={this.handleChange.bind(this)}
            />
            <FormField
              className= "signUpField"
              title="Password"
              type="password"
              holder="password"
              name="password"
              change={this.handleChange.bind(this)}
            />
            <FormField
              className= "signUpField"
              title="First Name"
              type="text"
              holder="Jane"
              name="firstName"
              change={this.handleChange.bind(this)}
            />
            <FormField
              className= "signUpField"
              title="Last Name"
              type="text"
              holder="Doe"
              name="lastName"
              change={this.handleChange.bind(this)}
            />
            <FormField
              className= "signUpField"
              title="Age"
              type="number"
              holder="21"
              name="age"
              change={this.handleChange.bind(this)}
            />
            <FormField
              className= "signUpField"
              title="Gender"
              type="text"
              holder="F"
              name="gender"
              change={this.handleChange.bind(this)}
            />

            <SubmitBtn title="SIGN UP" id="SignUpButton" submit={this.addNewUser.bind(this)}/>
          </Form>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps)(SignUp);
