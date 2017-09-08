import React, { Component } from 'react';
import { Button, FormGroup, FormControl, Col } from 'react-bootstrap';

class SubmitBtn extends Component {
  render() {
    return(
      <FormGroup>
        <Col smOffset={4} sm={4}>
          <Button type="submit" id={this.props.id} onClick={this.props.submit} block>
            {this.props.title}
          </Button>
        </Col>
      </FormGroup>
    );
  }
}

export default SubmitBtn;
