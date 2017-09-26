import React, { Component } from 'react';
import { Row, Col, Panel } from 'react-bootstrap';

import '../../stylesheets/PoolDetails.css';

class PoolClosed extends Component {
  render() {
    return(
      <div className="poolDetails">
        <Panel className={this.props.location}>
          <strong>{this.props.location}</strong><br/>
          {this.props.start}<br/>
          {this.props.end}<br/>
          host: {this.props.host}<br/>
          Joined: {this.props.joined} <br/>
        </Panel>
      </div>
    );
  }
}

export default PoolClosed;
