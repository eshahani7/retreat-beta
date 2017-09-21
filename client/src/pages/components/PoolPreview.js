import React, { Component } from 'react';
import { Row, Col, Panel } from 'react-bootstrap';

class PoolPreview extends Component {
  render() {
    return(
      <Panel>
        {this.props.location}<br/>
        {this.props.startDate}<br/>
        {this.props.endDate}<br/>
        host: {this.props.host}
      </Panel>
    );
  }
}

export default PoolPreview;
