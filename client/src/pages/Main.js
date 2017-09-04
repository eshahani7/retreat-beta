import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';

import paris from '../img/paris.png';
import tokyo from '../img/tokyo.png';
import florence from '../img/florence.png';

import '../stylesheets/Main.css';
import LoginControl from './components/LoginControl.js';
var PublicNavBar = require('./components/NavBar.js').PublicNavBar;
var UserNavBar = require('./components/NavBar.js').UserNavBar;

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <PublicNavBar/>
        <Row>
          <Col md={12} className="Main-intro">
            Where are you going?
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <div className = "image">
              <img src={paris}/>
              <h2>Paris</h2>
            </div>
          </Col>
          <Col md={4}>
            <div className="image">
              <img src={tokyo}/>
              <h2>Tokyo</h2>
            </div>
          </Col>
          <Col md={4}>
            <div className="image">
              <img src={florence}/>
              <h2>Florence</h2>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Main;
