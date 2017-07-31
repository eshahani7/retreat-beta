import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';

class FormField extends Component {
  render() {
    return(
      <label>
        {this.props.label}
        <input type="text" name={this.props.name}/>
      </label>
    );
  }
}

class SignUp extends Component {
  render() {
    return (
      <div className="SignUp">
        <form>
          <Row>
            <Col md= {4}>
              <FormField label="Email: " name="email"/>
            </Col>
            <Col md={4}>
              <FormField label="Password: " name="password"/>
            </Col>
          </Row>
          <Row>
            <Col md= {4}>
              <FormField label="First name: " name="firstName"/>
            </Col>
            <Col md={4}>
              <FormField label="Last name: " name="lastName"/>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
                <FormField label="Age: " name="age"/>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <input type="submit" value="Submit"/>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

export default SignUp;
