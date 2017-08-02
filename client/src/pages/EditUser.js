import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import FormField from './components/FormField.js';

class EditUser extends Component {

  state = {email:'', password:'', firstName:'', lastName:'', age:0};

  componentWillMount() {
    var token = sessionStorage.getItem('authToken');
    console.log(token);
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
        password: body.password,
        firstName: body.firstName,
        lastName: body.lastName
      });
      console.log(body);
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        age: this.state.age
      })
    }).catch((e) => {
      console.log(e);
    });
  }

  render() {
    return (
      <div className="EditUser">
        <form>
          <Row>
            <Col md= {4}>
              <FormField label="Email: " name="email" default={this.state.email}
                changeFunction={this.handleChange.bind(this)}/>
            </Col>
            <Col md={4}>
              <FormField label="Password: " name="password"
                changeFunction={this.handleChange.bind(this)}/>
            </Col>
          </Row>
          <Row>
            <Col md= {4}>
              <FormField label="First name: " name="firstName" default={this.state.firstName}
                changeFunction={this.handleChange.bind(this)}/>
            </Col>
            <Col md={4}>
              <FormField label="Last name: " name="lastName" default={this.state.lastName}
                changeFunction={this.handleChange.bind(this)}/>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
                <FormField label="Age: " name="age" default={this.state.lastName}
                  changeFunction={this.handleChange.bind(this)}/>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <input type="submit" value="Save"/>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

export default EditUser;
