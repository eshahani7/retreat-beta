import React, { Component } from 'react';
import { FormGroup, Form, FormControl, ControlLabel, Col } from 'react-bootstrap';

class FormField extends Component {
  render() {
    return(
      <FormGroup controlId="SignUpForm">
        <Col componentClass={ControlLabel} sm={4}>
          {this.props.title}
        </Col>
        <Col sm={4}>
          <FormControl
            type={this.props.type}
            placeholder= {this.props.holder}
            name={this.props.name}
            onChange={this.props.change}
            />
        </Col>
      </FormGroup>
    );
  }
}

export default FormField;
