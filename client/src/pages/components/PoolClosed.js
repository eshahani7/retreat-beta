import React, { Component } from 'react';
import { Row, Col, Panel } from 'react-bootstrap';

import '../../stylesheets/PoolDetails.css';

class PoolClosed extends Component {
  render() {
    return(
      <div className="poolDetails">
        <Panel>
          <Row id="closedDetails">
            <Col sm={12} id="">
              <Row id="closedLocationDetails">
                <strong>{this.props.location}</strong>
              </Row>

              <Row>
                Travel from {this.props.start} to {this.props.end}
              </Row>

              <Row>
                Host: {this.props.hostFirst} {this.props.hostLast}
              </Row>

              <Row id="closedTravelerInfo">
                Joined: {this.props.joined}
              </Row>

              <Row id="closedRestrictionDetails">
                <strong>Restrictions</strong> <br/>
                  Gender:{this.props.gender} <br/>
                  Minimum Age: {this.props.minAge} <br/>
                  Maximum Age: {this.props.maxAge}
              </Row>

              <Row>
                Bedrooms: {this.props.beds}
              </Row>
            </Col>
          </Row>

          <Row id="imagesThingyClosed">
            <img/>
            <img/>
            <img/>
          </Row>
        </Panel>
      </div>

      // <div className="poolDetails">
      //   <Panel className={this.props.location}>
      //     <strong>{this.props.location}</strong><br/>
      //     {this.props.start}<br/>
      //     {this.props.end}<br/>
      //     host: {this.props.host}<br/>
      //     Joined: {this.props.joined} <br/>
      //   </Panel>
      // </div>

    );
  }
}

export default PoolClosed;
