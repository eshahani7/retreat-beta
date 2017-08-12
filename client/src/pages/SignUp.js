import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import FormField from './components/FormField.js';

class SignUp extends Component {

  state = {email:'', password:'', firstName:'', lastName:'', age:0};

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
        age: this.state.age
      })
    }).then((res) => {
      sessionStorage.setItem('authToken', res.headers.get('x-auth'));
    }).catch((e) => {
      console.log(e);
    });
  }

  render() {
    return (
      <div className="SignUp">
        <form>
          <Row>
            <Col md= {4}>
              <FormField label="Email: " name="email" type="text" changeFunction={this.handleChange.bind(this)}/>
            </Col>
            <Col md={4}>
              <FormField label="Password: " name="password" type="password" changeFunction={this.handleChange.bind(this)}/>
            </Col>
          </Row>
          <Row>
            <Col md= {4}>
              <FormField label="First name: " name="firstName" type="text" changeFunction={this.handleChange.bind(this)}/>
            </Col>
            <Col md={4}>
              <FormField label="Last name: " name="lastName" type="text" changeFunction={this.handleChange.bind(this)}/>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
                <FormField label="Age: " name="age" type="number" changeFunction={this.handleChange.bind(this)}/>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <input type="submit" value="Submit" onClick={this.submitDetails.bind(this)}/>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

export default SignUp;
