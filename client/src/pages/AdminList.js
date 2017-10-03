import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchPoolsAdmin, selectPool } from '../actions/poolActions';
import PoolPreview from './components/PoolPreview';

const mapStateToProps = (state) => {
  return {
    poolList: state.pool.poolList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPoolsAdmin: () => { dispatch(fetchPoolsAdmin()) },
    selectPool: (poolId) => { dispatch(selectPool(poolId)) }
  };
}

class AdminList extends Component {
  componentWillMount() {
    this.props.fetchPoolsAdmin();
  }

  render() {
    const pools = this.props.poolList;
    return(
      <div className="admin">
        To Book:
        {pools.map((pool) =>
          <PoolPreview
            className="searchPoolPanel"
            key={pool._id}
            id={pool._id}
            location={pool.location}
            startDate={pool.startDate}
            endDate={pool.endDate}
            host={pool._creator}
            userList={pool._userList}
            goal={pool.goal}
            minPeople={pool.minPeople}
            themes={pool.themes}
            select={(poolId) => {this.props.selectPool(poolId)}}
            linkTarget={`/admin/book/${pool._id}`}
          />
          )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminList);
