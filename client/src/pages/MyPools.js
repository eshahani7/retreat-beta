import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchMyPools } from '../actions/poolActions'

import LoginControl from './components/LoginControl';
import PoolPreview from './components/PoolPreview';

const mapStateToProps = (state) => {
  return {
    poolList: state.pool.poolList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchMyPools: () => {dispatch(fetchMyPools())}
  }
};


class MyPools extends Component {
  componentWillMount() {
    this.props.fetchMyPools()
  }

  render() {
    const pools = this.props.poolList;
    return(
      <div className="mypools">
        <LoginControl/>
        <Row>
          <Col sm={3}>
            Placeholder
          </Col>
          <Col sm={9}>
            {pools.map((pool) =>
              <PoolPreview
                key={pool._id}
                location={pool.location}
                startDate={pool.startDate}
                endDate={pool.endDate}
                host={pool._creator}
              />
              )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPools);
