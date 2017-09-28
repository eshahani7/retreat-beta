import React, { Component } from 'react';
import { Row, Col, Button, Panel, ProgressBar } from 'react-bootstrap';

import '../../stylesheets/PoolDetails.css';

class PoolOpen extends Component {
  render() {
    var now = 60; //this.props.minPeople / this.props.maxShare
    return(
      <div className="poolDetails">
        <Panel>
          <Row id="infoDetails">
            <Col sm={9} id="detailsLeftSide">
              <Row id="locationDetails">
                <strong>{this.props.location}</strong>
              </Row>

              <Row>
                Travel from {this.props.start} to {this.props.end}
              </Row>

              <Row>
                Host: {this.props.host}
              </Row>

              <Row id="openTravelerDetails">
                Travelers: {this.props.joined}
              </Row>

              <Row id="openRestrictionDetails">
                <strong>Restrictions</strong> <br/>
                  Gender:{this.props.gender} <br/>
                  Minimum Age: {this.props.minAge} <br/>
                  Maximum Age: {this.props.maxAge}
              </Row>

              <Row>
                Themes: {this.props.themes}
              </Row>
            </Col>

            <Col sm={3} id="detailsRightSide">
              <Row>
                Share Price: ${this.props.goal}
              </Row>
              <Row>
                people / minPeople
                {/* {this.props.joined.length}/{this.props.minPeople} */}
              </Row>
              <Row>
                <ProgressBar active bsStyle="success" now={now} label={`${now}%`} />
              </Row>

              <Row>
                <Button onClick={this.props.submit}>Join</Button>
              </Row>

            </Col>
          </Row>

          <Row id="imagesThingy">
            <img/>
            <img/>
            <img/>
          </Row>
          {/*}
          <Panel className={this.props.location}>
            <strong>{this.props.location}</strong><br/>
            {this.props.start}<br/>
            {this.props.end}<br/>
            host: {this.props.host}<br/>
            Joined: {this.props.joined} <br/>
            <Button onClick={this.props.submit}>Join</Button>
          </Panel>
          */}
        </Panel>
      </div>
    );
  }
}

export default PoolOpen;
