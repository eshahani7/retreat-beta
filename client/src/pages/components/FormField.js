import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';

class FormField extends Component {
  render() {
    return(
      <label>
        {this.props.label}
        <input type={this.props.type} name={this.props.name} value={this.props.default} onChange={this.props.changeFunction}/>
      </label>
    );
  }
}

export default FormField;
