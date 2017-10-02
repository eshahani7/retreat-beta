import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../stylesheets/MyPools.css';

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
        <Row className="myPoolsHeader">
          <Col sm={12}>
            My Pools
          </Col>
        </Row>
        <Row id="myPoolsList">
          <Col sm={2}>
          </Col>
          <Col sm={8}>

            {pools.map((pool) =>
              <PoolPreview
                key={pool._id}
                location={pool.location}
                startDate={pool.startDate}
                endDate={pool.endDate}
                host={pool._creator}
                userList={pool._userList}
                themes={pool.themes}
                minPeople={pool.minPeople}
                goal={pool.goal}
                linkTarget={`/pool/details/${pool._id}`}
              />
              )}
          </Col>
          <Col sm={2}>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPools);
