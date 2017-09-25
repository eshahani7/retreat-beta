import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import '../stylesheets/poolsearch.css'

import { fetchPools, selectPool } from '../actions/poolActions'

import LoginControl from './components/LoginControl';
import QueryBox from './components/QueryBox';
import PoolPreview from './components/PoolPreview';
import NavLink from './components/Link';

const mapStateToProps = (state) => {
  return {
    initLocation: state.pool.initLocation,
    poolList: state.pool.poolList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchPools: (query) => { dispatch(fetchPools(query)) },
      selectPool: (poolId) =>{ dispatch(selectPool(poolId)) }
  }
};

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
          <Col sm={3} id="header">
            {this.props.initLocation}
          </Col>
          <Col sm={9} id="header">
            <NavLink target="/create" name="Create Pool"/>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <QueryBox search={(query) => {this.props.fetchPools(query)}}
              location={this.props.initLocation}/>
          </Col>
          <Col sm={9}>
            {pools.map((pool) =>
              <PoolPreview
                key={pool._id}
                id={pool._id}
                location={pool.location}
                startDate={pool.startDate}
                endDate={pool.endDate}
                host={pool._creator}
                select={(poolId) => {this.props.selectPool(poolId)}}
                linkTarget={`/pool/details/${pool._id}`}
              />
              )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PoolListContainer);
