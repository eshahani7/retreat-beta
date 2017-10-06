import React, { Component } from 'react';
import { Row, Col, Button, Panel, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';

import { joinPool, selectPool } from '../actions/poolActions';
import { fetchBooking } from '../actions/bookingActions';

import LoginControl from './components/LoginControl';
import PoolPreview from './components/PoolPreview';
import PoolOpen from './components/PoolOpen';
import PoolClosed from './components/PoolClosed';
import PoolBooked from './components/PoolBooked';
import PageError from './components/Error';

import '../stylesheets/PoolDetails.css';

const mapStateToProps = (state) => {
  return {
    selectedPool: state.pool.selectedPool,
    poolBooking: state.booking.booking,
    poolLocation: state.booking.location,
    hostInfo: state.user.userInfo,
    isUser: state.pool.userInSelected
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      selectPool: (poolId) =>{ dispatch(selectPool(poolId)) },
      joinPool: (poolId) => { dispatch(joinPool(poolId)) }
  };
};

function goBack(){
  window.history.back();
}

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
    console.log(this.props.selectedPool._id);
    this.props.joinPool(this.props.selectedPool._id);
  }

  render() {
    let details = null;
    const selected = this.props.selectedPool;
    const booking = this.props.poolBooking;
    const location = this.props.poolLocation;
    var startDate = new Date(selected.startDate);
    var endDate = new Date(selected.endDate);

    if(!selected.poolClosed) {
      details =
      <PoolOpen
        location={selected.location}
        start={startDate.toDateString()}
        end={endDate.toDateString()}
        hostFirst={this.props.hostInfo.firstName}
        hostLast={this.props.hostInfo.lastName}
        goal={selected.goal}
        minPeople={selected.minPeople}
        gender={selected.gender}
        minAge={selected.minAge}
        maxAge={selected.maxAge}
        themes={selected.themes}
        joined={selected._userList}
        inUserList={this.props.isUser}
        submit={this.join.bind(this)}
      />
    }
    else if(selected.poolBooked && !this.props.isUser) {
      details = <PageError/>
    }
    else if(selected.poolBooked) {
      details =
      <PoolBooked
        location={selected.location}
        start={booking.startDate}
        end={booking.endDate}
        hostFirst={this.props.hostInfo.firstName}
        hostLast={this.props.hostInfo.lastName}
        gender={selected.gender}
        goal={selected.goal}
        minPeople={selected.minPeople}
        minAge={selected.minAge}
        maxAge={selected.maxAge}
        themes={selected.themes}
        joined={selected._userList}
        beds={location.numBed}
        baths={location.numBath}
      />
    }
    else if(selected.poolClosed){
      details =
      <PoolClosed
        location={selected.location}
        start={startDate.toDateString()}
        end={endDate.toDateString()}
        hostFirst={this.props.hostInfo.firstName}
        hostLast={this.props.hostInfo.lastName}
        gender={selected.gender}
        goal={selected.goal}
        minPeople={selected.minPeople}
        minAge={selected.minAge}
        maxAge={selected.maxAge}
        themes={selected.themes}
        joined={selected._userList}
      />
    }
    else {
      details = <PageError/>
    }

    return(
      <div className="poolDetails">
        <LoginControl/>
        {/*<Button className={this.props.initLocation + "Button"} id="detailsBackButton" onClick={goBack}><span id="backArrow"> <Glyphicon glyph="chevron-left"/> {this.props.initLocation}</span></Button>*/}
        {details}
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
