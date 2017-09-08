import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Form, Row, Col } from 'react-bootstrap';
import '../stylesheets/form.css';
import '../stylesheets/Login.css';

import { connect } from 'react-redux';
import { loginUser } from '../actions/userActions.js';

import FormField from './components/FormField.js';
import SubmitBtn from './components/SubmitBtn.js';

import LoginControl from './components/LoginControl.js';

class Login extends Component {
  state = {email:'', password:''};

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  loginUser(e) {
    e.preventDefault();
    var user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.dispatch(loginUser(user));
  }

  render() {
      return (
        <div className="Login">
         <LoginControl/>
          <Row>
            <Col md={12} id="LoginHeader">
              WELCOME BACK!
            </Col>
          </Row>

          <Form horizontal className="loginForm">
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
            <SubmitBtn title="Log In" id="LoginButton" submit={this.loginUser.bind(this)}/>
          </Form>

          <Link to="/viewuser">View User</Link>
        </div>
      );
    }
  }

  export default connect()(Login);
