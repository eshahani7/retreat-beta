import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import LoginControl from './components/LoginControl.js';
import QueryBox from './components/QueryBox'

class PoolListContainer extends Component {
  render() {
    return(
      <div className="poolList">
        <LoginControl/>
        <Row>
          <Col sm={3}>
            <QueryBox/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PoolListContainer;
