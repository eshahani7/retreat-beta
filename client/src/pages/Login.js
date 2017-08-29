import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button, FormGroup, Form, FormControl, ControlLabel, Col } from 'react-bootstrap';
import '../stylesheets/form.css';

var PublicNavBar = require('./components/NavBar.js').PublicNavBar;
var UserNavBar = require('./components/NavBar.js').UserNavBar;

class Login extends Component {
  state = {email:'', password:''};

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  enterCreds(e) {
    e.preventDefault();
    fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    }).then((res) => {
      sessionStorage.setItem('authToken', res.headers.get('x-auth'));
    }).catch((e) => {
      console.log(e);
    });

    this.setState({
      email: '',
      password: ''
    });
  }

  render() {
      var btnStyle = {
        backgroundColor: '#f4b042',
        borderColor: 'black',
        borderWidth: '1px',
        borderStyle: 'solid',
        color: 'black',
        fontWeight: 'bold',
        outlineColor: 'black'
      }

      return (
        <div className="Login">
          <PublicNavBar/>
          <div className="header">
          <Form horizontal className="loginForm">
            <FormGroup controlId="formHorizontalEmail">
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

            <FormGroup controlId="formHorizontalPassword">
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

            <FormGroup>
              <Col smOffset={4} sm={4}>
                <Button type="submit" style={btnStyle} onClick={this.enterCreds.bind(this)} block>
                  Sign in
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>

          <Link to="/viewuser">View User</Link>
        </div>
      );
    }
  }

  export default Login;
