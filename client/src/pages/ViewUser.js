import React, { Component } from 'react';
import { Button, FormGroup, Form, FormControl, ControlLabel, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import FormField from './components/FormField.js';

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
        <form>
          <Row>
            <Col md= {4}>
              <FormField label="Email: " name="email" type="text" placeholder={this.state.email}
                default={this.state.email} changeFunction={this.handleChange.bind(this)}/>
            </Col>
            <Col md={4}>
              <FormField label="Password: " name="password" type="password"
                changeFunction={this.handleChange.bind(this)}/>
            </Col>
          </Row>
          <Row>
            <Col md= {4}>
              <FormField label="First name: " name="firstName" type="text" placeholder={this.state.firstName}
                default={this.state.firstName} changeFunction={this.handleChange.bind(this)}/>
            </Col>
            <Col md={4}>
              <FormField label="Last name: " name="lastName" type="text" placeholder={this.state.lastName}
                default={this.state.lastName} changeFunction={this.handleChange.bind(this)}/>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
                <FormField label="Age: " name="age" type="number" placeholder={this.state.age}
                  default={this.state.age} changeFunction={this.handleChange.bind(this)}/>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <input type="submit" value="UPDATE" onClick={this.saveChange.bind(this)}/>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

export default ViewUser;
