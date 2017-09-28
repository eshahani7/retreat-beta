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

class PoolPreview extends Component {
  onSelect() {
    console.log(this.props.id);
    this.props.select(this.props.id);
  }

  componentWillMount(){
    var response = this.props.findUser(this.props.host);
  }

  formatDate(date){
    var dayNum = date.getDay();
    var day = "";
    var date = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();

    if(dayNum == 0){
      day = "Sunday";
    }
    else if(dayNum == 1){
      day = "Monday";
    }
    else if(dayNum == 2){
      day = "Tuesday";
    }
    else if(dayNum == 3){
      day = "Wednesday";
    }
    else if(dayNum == 4){
      day = "Thursday";
    }
    else if(dayNum == 5){
      day = "Friday";
    }
    else if(dayNum == 6){
      day = "Saturday";
    }

    var fullDate = day + " " + date + "/" + month + "/" + year;

    return fullDate;
  }

  formatThemes(themes){
    
  }

  render() {

    // var startDate = formatDate(new Date(this.props.startDate));
    // var endDate = formatDate(new Date(this.props.endDate));

    var startDate = new Date(this.props.startDate);
    var endDate = new Date(this.props.endDate);

    startDate = startDate.toDateString();
    endDate = endDate.toDateString();
    console.log("GOAL: " + this.props.goal);

    console.log("HOST INFO: " + this.props.hostInfo.firstName);
    return(
      <Panel className={this.props.className}>
        <Row>
          <Col sm={9} id="infoSide">
            <Row id="locationInfo">
              <strong>{this.props.location}</strong>
            </Row>

            <Row id="dateInfo">
              Travel from {startDate} to {endDate}
            </Row>

            <Row id="hostInfo">
              Host: {this.props.hostFirstName} {this.props.hostLastName}
            </Row>

            <Row>
              <Col sm={6} id="travelerInfo">
                Travelers: {this.props.userList}
              </Col>
              <Col sm={6} id="sharePriceInfo">
                Share Price: ${this.props.goal}
              </Col>
            </Row>

            <Row id="themeInfo">
              Themes: {this.props.themes}
            </Row>

            <Row>
              <NavLink target={this.props.linkTarget} name="Details"/>
            </Row>
          </Col>

          <Col sm={3} id="imageSide">
            <img/>
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
