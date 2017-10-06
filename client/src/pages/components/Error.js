import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class PageError extends Component {
  render() {
    return(
      <div id="error">
        Error 401: Unauthorized
      </div>
    );
  }
}

export default PageError;
