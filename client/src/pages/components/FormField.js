import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';

class FormField extends Component {
  render() {
    return(
      <label>
        {this.props.label}
        <input type="text" name={this.props.name} onChange={this.props.changeFunction}/>
      </label>
    );
  }
}

export default FormField;
