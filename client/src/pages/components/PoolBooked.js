import '../../stylesheets/PoolDetails.css';

import React, { Component } from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import StripeCheckout from 'react-stripe-checkout';
const env = require('node-env-file');


class PoolBooked extends Component {
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
    return(
      <div className="poolDetails">
        <Panel>
          <Row id="bookedDetails">
            <Col sm={9} id="">
              <Row id="bookedLocationDetails">
                <strong>{this.props.location}</strong>
              </Row>

              <Row>
                Travel from {this.props.start} to {this.props.end}
              </Row>

              <Row>
                Host: {this.props.hostFirst} {this.props.hostLast}
              </Row>

              <Row id="bookedTravelerDetails">
                Joined: {this.props.joined}
              </Row>

              <Row id="bookedRestrictionDetails">
                <strong>Restrictions</strong> <br/>
                  Gender:{this.props.gender} <br/>
                  Minimum Age: {this.props.minAge} <br/>
                  Maximum Age: {this.props.maxAge}
              </Row>

              <Row>
                Bedrooms: {this.props.beds}
              </Row>
            </Col>

            <Col sm={3}>
              <Row>
                Bathrooms: ${this.props.baths}
              </Row>
              <Row>
                people / minPeople
                {/* {this.props._userList.length}/{this.props.minPeople} */}
              </Row>

              <StripeCheckout
                token={this.onToken.bind(this)}
                stripeKey={process.env.STRIPE_KEY_PUBLIC}
              />
            </Col>
          </Row>

          <Row id="imagesThingyBooked">
            <img/>
            <img/>
            <img/>
          </Row>
        </Panel>
      </div>


      // <div className="poolDetails">
      //   This pool booked yay.
      //   <Panel className={this.props.location}>
      //     <strong>{this.props.location}</strong><br/>
      //     {this.props.start}<br/>
      //     {this.props.end}<br/>
      //     host: {this.props.host}<br/>
      //     Joined: {this.props.joined} <br/>
      //     Bedrooms: {this.props.beds} <br/>
      //     Bathrooms: {this.props.baths} <br/>
      //   </Panel>
      //   <StripeCheckout
      //     token={this.onToken.bind(this)}
      //     stripeKey={process.env.STRIPE_KEY_PUBLIC}
      //   />
      // </div>

    );
  }
}

export default PoolBooked;
