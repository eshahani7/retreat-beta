import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import FormField from './components/FormField.js';

class EditUser extends Component {

  state = {email:'', password:'', firstName:'', lastName:'', age:0};

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
        password: body.password,
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
      <div className="EditUser">
        <form>
          <Row>
            <Col md= {4}>
              <FormField label="Email: " name="email" type="text"
                default={this.state.email} changeFunction={this.handleChange.bind(this)}/>
            </Col>
            <Col md={4}>
              <FormField label="Password: " name="password" type="password"
                changeFunction={this.handleChange.bind(this)}/>
            </Col>
          </Row>
          <Row>
            <Col md= {4}>
              <FormField label="First name: " name="firstName" type="text"
                default={this.state.firstName} changeFunction={this.handleChange.bind(this)}/>
            </Col>
            <Col md={4}>
              <FormField label="Last name: " name="lastName" type="text"
                default={this.state.lastName} changeFunction={this.handleChange.bind(this)}/>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
                <FormField label="Age: " name="age" type="number"
                  default={this.state.age} changeFunction={this.handleChange.bind(this)}/>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <input type="submit" value="Save" onClick={this.saveChange.bind(this)}/>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

export default EditUser;
