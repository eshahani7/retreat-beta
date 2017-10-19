import React, { Component } from 'react';
import { Row, Col, Glyphicon, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
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

function goBack(){
  window.history.back();
}

class PoolListContainer extends Component {
  componentWillMount() {
    var url = window.location.href;
    var i = url.lastIndexOf('/');
    var loc = url.substr(i+1);
    loc = loc.charAt(0).toUpperCase() + loc.slice(1);
    console.log(loc);
    this.props.fetchPools({
      location: loc,
      poolClosed: false
    });
  }

  render() {
    const pools = this.props.poolList;
    // var hostName = this.props.hostFirstName + " " + this.props.hostLastName;
    return(
      <div className="poolList">
        <LoginControl/>
        <Row id="poolsListingPage">
          <Col sm={3} id="poolsLeftSide">
            <Row id="headerLocation">
              <Button className={this.props.initLocation + "Button"} id="locationButton" href="/"><span id="backArrow"> <Glyphicon glyph="chevron-left"/> {this.props.initLocation}</span></Button>
            </Row>
            <Row id="searchThingy">
              <QueryBox search={(query) => {this.props.fetchPools(query)}}
                location={this.props.initLocation}/>
            </Row>
          </Col>

          <Col sm={9} id="poolsRightSide">
            <Row id="header">
              <Button id="createButton" href="/create"><Glyphicon glyph="plus-sign"/> CREATE POOL</Button>
            </Row>
            <Row id="poolsListings">
              <ListGroup>
                {pools.map((pool) =>
                  <ListGroupItem>
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
                      image={pool.image}
                      select={(poolId) => {this.props.selectPool(poolId)}}
                      linkTarget={`/pool/details/${pool._id}`}
                    />
                  </ListGroupItem>
                )}
              </ListGroup>
            </Row>
          </Col>
        </Row>
        {/*
        // <Row>
        //   <Col sm={2} id="headerLocation">
        //     <Button className={this.props.initLocation + "Button"} id="locationButton" href="/"><span id="backArrow"> <Glyphicon glyph="chevron-left"/> {this.props.initLocation}</span></Button>
        //   </Col>
        //   <Col sm={10} id="header">
        //     <Button id="createButton" href="/create"><Glyphicon glyph="plus-sign"/> CREATE POOL</Button>
        //   </Col>
        // </Row>
        // <Row>
        //   <Col sm={3}>
        //     <QueryBox search={(query) => {this.props.fetchPools(query)}}
        //       location={this.props.initLocation}/>
        //   </Col>
        //   <Col sm={9}>
        //   <ListGroup>
        //     {pools.map((pool) =>
        //       <ListGroupItem>
        //         <PoolPreview
        //           className="searchPoolPanel"
        //           key={pool._id}
        //           id={pool._id}
        //           location={pool.location}
        //           startDate={pool.startDate}
        //           endDate={pool.endDate}
        //           host={pool._creator}
        //           select={(poolId) => {this.props.selectPool(poolId)}}
        //           linkTarget={`/pool/details/${pool._id}`}
        //         />
        //       </ListGroupItem>
        //       )}
        //   </ListGroup>
        //   </Col>
        // </Row>
        */}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PoolListContainer);
