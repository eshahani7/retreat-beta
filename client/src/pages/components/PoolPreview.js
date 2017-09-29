import React, { Component } from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { findUser } from '../../actions/userActions';
import '../../stylesheets/poolPreview.css'

import NavLink from './Link';

const mapStateToProps = (state ) => {
  return {
    hostInfo: state.user.userInfo,
    hostFirstName: state.user.userInfo.firstName,
    hostLastName: state.user.userInfo.lastName,
    found: state.user.found
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      findUser: (userID) =>{ dispatch(findUser(userID))}
  };
};

function formatDate(convert){
  var dayNum = convert.getDay();
  var day = "";
  var date = convert.getDate();
  var month = convert.getMonth()+1;
  var year = convert.getFullYear();

  var dayArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday', 'Sunday'];

  day = dayArray[dayNum];

  var fullDate = day + ", " + month + "/" + date + "/" + year;
  console.log(fullDate);
  return fullDate;
}

class PoolPreview extends Component {
  onSelect() {
    console.log(this.props.id);
    this.props.select(this.props.id);
  }

  // componentWillMount(){
  //   var response = this.props.findUser(this.props.host);
  // }

  render() {

    var startDate = formatDate(new Date(this.props.startDate));
    var endDate = formatDate(new Date(this.props.endDate));

    console.log("GOAL: " + this.props.goal);

    console.log("HOST INFO: " + this.props.hostInfo.firstName);
    return(
      <Panel className={this.props.className}>
        <Row>
          <Col sm={9} id="infoSide">
            <Row id="locationInfo">
              <strong>{this.props.location.toUpperCase()}</strong>
            </Row>

            <Row id="dateInfo">
              Travel from <u>{startDate}</u> to <u>{endDate}</u>
            </Row>

            <Row id="userInfoPreview">
              <Col sm={6} id="travelerInfo">
                Travelers: {this.props.userList.length} people traveling
              </Col>
              <Col sm={6} id="sharePriceInfo">
                Share Price: ${this.props.goal}
              </Col>
            </Row>

            <Row id="themeInfo">
              Themes: {this.props.themes}
            </Row>

            <Row id="detailsButton">
              <NavLink target={this.props.linkTarget} name="Details"/>
            </Row>
          </Col>

          <Col sm={3} id="imageSide">
            {/* <img url="../../img/goatPhoto.jpeg"/> */}
          </Col>
        </Row>
      </Panel>

      // <Panel className={this.props.className}>
      //   <strong>{this.props.location}</strong><br/>
      //   {startDate.toDateString()}<br/>
      //   {endDate.toDateString()}<br/>
      //   host: {this.props.hostFirstName + " " + this.props.hostLastName}<br/>
      // <NavLink target={this.props.linkTarget} name="Details"/>
      // </Panel>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PoolPreview);
