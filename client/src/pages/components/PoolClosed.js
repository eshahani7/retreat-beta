import React, { Component } from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import StripeCheckout from 'react-stripe-checkout';

import '../../stylesheets/PoolDetails.css';
const env = require('node-env-file');

class PoolClosed extends Component {
  onToken(token) {
    console.log(token);
    var details = {
      stripeEmail: token.email,
      stripeToken: token.id
    }
    fetch('/bookings/charge', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(details)
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }
      else  {
        return Promise.reject({status: res.status});
      }
    }).then((body) => {
      console.log(body);
    }).catch((e) => {
      console.log(e);
    });
  }

  render() {
    var minShare = this.props.goal / this.props.minPeople
    minShare = minShare.toFixed(2) * 100;
    var sharePrice = this.props.goal/this.props.joined.length;

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

              <StripeCheckout
                token={this.onToken.bind(this)}
                stripeKey={process.env.STRIPE_KEY_PUBLIC}
                amount={minShare}
              />
            </Col>
          </Row>

          <Row id="openDetailsImages">
            Possible Bookings:
          </Row>
          <Row id="imagesThingyClosed">
            <Col sm={4}>
              <img src={require('../../img/goatPhoto.jpeg')}/>
            </Col>
            <Col sm={4}>
              <img src={require('../../img/goatPhoto.jpeg')}/>
            </Col>
            <Col sm={4}>
              <img src={require('../../img/goatPhoto.jpeg')}/>
            </Col>
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
