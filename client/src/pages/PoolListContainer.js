import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import '../stylesheets/poolsearch.css'

import { fetchPools } from '../actions/poolActions'

import LoginControl from './components/LoginControl';
import QueryBox from './components/QueryBox'

const mapStateToProps = (state) => {
  return {
    initLocation: state.pool.initLocation,
    poolList: state.pool.poolList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchPools: (query) => {dispatch(fetchPools(query))}
  }
};

class PoolListContainer extends Component {
  componentWillMount() {
    this.props.fetchPools({
      location: this.props.initLocation
    });
  }

  render() {
    return(
      <div className="poolList">
        <LoginControl/>
        <Row>
          <Col sm={3}>
            Location
          </Col>
          <Col sm={9}>
            Create Pool
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <QueryBox/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PoolListContainer);
