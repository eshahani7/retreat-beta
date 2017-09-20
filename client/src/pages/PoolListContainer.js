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

const PoolsList = () => {
  const pools = this.props.poolList;
  const poolItems = pools.map((pool) => {
    <li key={pool._id}>
      {pool.location}
    </li>
  });
  return (
    <ul>
      {poolItems}
    </ul>
  );
}

class PoolListContainer extends Component {
  componentWillMount() {
    this.props.fetchPools({
      location: this.props.initLocation
    });
  }

  render() {
    const pools = this.props.poolList;
    return(
      <div className="poolList">
        <LoginControl/>
        <Row>
          <Col sm={3}>
            {this.props.initLocation}
          </Col>
          <Col sm={9}>
            Create Pool
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <QueryBox search={(query) => {this.props.fetchPools(query)}}
              location={this.props.initLocation}/>
          </Col>
          <Col sm={9}>
            {pools.map((pool) =>
              <li key={pool._id}>
                {pool.location}
              </li>
              )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PoolListContainer);
