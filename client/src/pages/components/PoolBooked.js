import React, { Component } from 'react';
import { Row, Col, Panel } from 'react-bootstrap';

import '../../stylesheets/PoolDetails.css';

class PoolBooked extends Component {
  render() {
    return(
      <div className="poolDetails">
        This pool booked yay.
        <Panel className={this.props.location}>
          <strong>{this.props.location}</strong><br/>
          {this.props.start}<br/>
          {this.props.end}<br/>
          host: {this.props.host}<br/>
          Joined: {this.props.joined} <br/>
          Bedrooms: {this.props.beds} <br/>
          Bathrooms: {this.props.baths} <br/>
        </Panel>
      </div>
    );
  }
}

export default PoolBooked;
