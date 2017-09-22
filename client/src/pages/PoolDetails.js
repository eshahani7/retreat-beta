import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { joinPool } from '../actions/poolActions'

import LoginControl from './components/LoginControl';
import PoolPreview from './components/PoolPreview';

const mapStateToProps = (state) => {
  return {
    selectedPool: state.pool.selectedPool
  };
};

{/*Note: also have to display host and joined user IDs as names by lookup,
should be similar to what needs to be done for PoolPreview*/}

class PoolDetails extends Component {
  join(e) {
    e.preventDefault();
    this.props.dispatch(joinPool(this.props.selectedPool._id));
  }

  render() {
    const selected = this.props.selectedPool;
    return(
      <div className="poolDetails">
        <LoginControl/>
        {selected.location} <br/>
        {selected.startDate} <br/>
        {selected.endDate} <br/>
        host: {selected._creator} <br/>
        Joined: {selected._userList} <br/>
        <Button onClick={this.join.bind(this)}>Join</Button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PoolDetails);