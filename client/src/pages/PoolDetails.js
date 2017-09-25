import React, { Component } from 'react';
import { Row, Col, Button, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';

import { joinPool, selectPool } from '../actions/poolActions'

import LoginControl from './components/LoginControl';
import PoolPreview from './components/PoolPreview';

import '../stylesheets/PoolDetails.css';

const mapStateToProps = (state) => {
  return {
    selectedPool: state.pool.selectedPool
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      selectPool: (poolId) =>{ dispatch(selectPool(poolId)) }
  }
};

{/*Note: also have to display host and joined user IDs as names by lookup,
should be similar to what needs to be done for PoolPreview*/}

class PoolDetails extends Component {
  componentWillMount() {
    var url = window.location.href;
    var i = url.lastIndexOf('/');
    var selectId = url.substr(i+1);
    this.props.selectPool(selectId);
  }

  join(e) {
    e.preventDefault();
    this.props.dispatch(joinPool(this.props.selectedPool._id));
  }

  render() {
    const selected = this.props.selectedPool;

    console.log("Start DATE: " + selected.startDate);

    var startDate = new Date(selected.startDate);
    var endDate = new Date(selected.endDate);

    return(
      <div className="poolDetails">
        <LoginControl/>
        <Panel className={selected.location}>
          <strong>{selected.location}</strong><br/>
          {startDate.toDateString()}<br/>
          {endDate.toDateString()}<br/>
          host: {selected._creator}<br/>
          Joined: {selected._userList} <br/>
          <Button onClick={this.join.bind(this)}>Join</Button>
        </Panel>

      </div>
    );

    {/*return(
      <div className="poolDetails">
        <LoginControl/>

        {selected.location} <br/>
        {selected.startDate} <br/>
        {selected.endDate} <br/>
        host: {selected._creator} <br/>
        Joined: {selected._userList} <br/>
        <Button onClick={this.join.bind(this)}>Join</Button>
      </div>
    );*/}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PoolDetails);
