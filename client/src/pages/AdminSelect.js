import React, { Component } from 'react';
import { Row, Col, Panel, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import { fetchLocs } from '../actions/locActions';
import { selectPool } from '../actions/poolActions';
import { bookPool } from '../actions/bookingActions';

import LoginControl from './components/LoginControl';

const mapStateToProps = (state) => {
  return {
    selectedPool: state.pool.selectedPool,
    locList: state.loc.locList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLocs: (city) => { dispatch(fetchLocs(city)) },
    selectPool: (poolId) => { dispatch(selectPool(poolId)) },
    bookPool: (details) => { dispatch(bookPool(details)) }
  };
}

class AdminSelect extends Component {
  state = {startDate: moment(), endDate: moment(new Date()).add(1,'days'), location:{}};

  componentWillMount() {
    var url = window.location.href;
    var i = url.lastIndexOf('/');
    var selectId = url.substr(i+1);
    this.props.selectPool(selectId);
  }

  selectLoc() {
    console.log('loc selected');
  }

  select(e) {
    e.preventDefault();
    this.props.fetchLocs({
      city: this.props.selectedPool.location
    });
  }

  handleChangeStart(date) {
    this.setState({ startDate: date });
  }
  handleChangeEnd(date) {
    this.setState({ endDate: date });
  }

  selectLoc(loc) {
    this.setState({ location: loc })
  }

  book(e) {
    e.preventDefault();
    var details = {
      startDate: this.state.startDate.toDate(),
      endDate: this.state.endDate.toDate(),
      _poolId: this.props.selectedPool._id,
      _locId: this.state.location._id
    }
    this.props.bookPool(details);
  }

  render() {
    const locs = this.props.locList;
    const selected = this.props.selectedPool;
    return(
      <div className="adminSelect">
        <LoginControl/>
        <Row>
          <Col sm={12}>
            <Panel>
              {selected.location} <br/>
              {selected.startDate} <br/>
              {selected.endDate} <br/>
              host: {selected._creator} <br/>
              Joined: {selected._userList} <br/>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <br/><br/>
            <DatePicker name="startDate" selected={this.state.startDate}
              onChange={this.handleChangeStart.bind(this)}/>
            <br></br>
            <DatePicker name="endDate" selected={this.state.endDate}
              onChange={this.handleChangeEnd.bind(this)}/>
          </Col>
          <Col sm={9}>
            <Button onClick={this.select.bind(this)}>Find Properties</Button>
            <Button onClick={this.book.bind(this)}>Book Property</Button>
            <h3>Select a property</h3>
            <ListGroup>
            {locs.map((loc) =>
              <ListGroupItem key={loc._id} header={loc.city}
                onClick={() => this.selectLoc(loc)}>
                Bedrooms: {loc.numBed}, Bathrooms:{loc.numBath} <br/>
                Max Capacity: {loc.maxCapacity} <br/>
                {loc.listingUrl}
              </ListGroupItem>
              )}
            </ListGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSelect);
