import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import paris from '../img/paris.png';
import tokyo from '../img/tokyo.png';
import florence from '../img/florence.png';

import { setInitLocation } from '../actions/poolActions';

import '../stylesheets/Main.css';
import LoginControl from './components/LoginControl.js';

const mapStateToProps = (state) => {
  return {
    initLocation: state.pool.initLocation
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      setInitLocation: (loc) => { dispatch(setInitLocation(loc)); }
  };
};

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <LoginControl/>
        <Row>
          <Col md={12} className="Main-intro">
            Where are you going?
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Link to="/pools/paris" className="link">
              <div className = "image" onClick={() => {this.props.setInitLocation('Paris')}}>
                <img src={paris}/>
                <h2>Paris</h2>
              </div>
            </Link>
          </Col>
          <Col md={4}>
            <Link to="/pools/tokyo" className="link" onClick={() => {this.props.setInitLocation('Tokyo')}}>
              <div className="image">
                <img src={tokyo}/>
                <h2>Tokyo</h2>
              </div>
            </Link>
          </Col>
          <Col md={4}>
            <Link to="/pools/florence" className="link" onClick={() => {this.props.setInitLocation('Florence')}}>
              <div className="image">
                <img src={florence}/>
                <h2>Florence</h2>
              </div>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
