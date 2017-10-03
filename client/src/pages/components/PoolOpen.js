import React, { Component, Image } from 'react';
import { Row, Col, Button, Panel, ProgressBar, Glyphicon } from 'react-bootstrap';

import '../../stylesheets/PoolDetails.css';

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

function formatThemes(themes){
  var themeList = "";
  if(themes != undefined){
    for(var i = 0; i < themes.length; i++){
      themeList += themes[i].charAt(0).toUpperCase() + themes[i].slice(1);
      if(i != (themes.length - 1)){
          themeList += ", ";
      }
    }
  }
  else{
    themeList = "none";
  }

  return themeList;
}

function formatTravelers(travelers){
  var travelerList ="";
  if(travelers != undefined){
    for(var i = 0; i < travelers.length; i++){
      travelerList += travelers[i][0].charAt(0).toUpperCase() + travelers[i][0].slice(1);
      console.log("Traveler: " + travelers[i][0]);
      if(i != (travelers.length - 1)){
          travelerList += ", ";
      }
    }
  }
  else{
    travelerList = "None yet";
  }

  return travelerList;
}

function goBack(){
  window.history.back();
}

class PoolOpen extends Component {

  render() {
    var startDate = formatDate(new Date(this.props.start));
    var endDate = formatDate(new Date(this.props.end));

    var themeList = formatThemes(this.props.themes);

    var travelerList = formatTravelers(this.props.joined);

    var now;
    if(this.props.joined == undefined){
      now = 0;
    }
    else{
      now = this.props.joined.length / this.props.minPeople * 100;
      now = now.toFixed(2);
    }

    let travelersJoin = null;

    if(this.props.joined == undefined){
      travelersJoin = "0 / this.props.minPeople travelers have joined";
    }
    else{
      travelersJoin = this.props.joined.length + " / " + this.props.minPeople + " travelers have joined";
    }
    return(
      <div className="poolOpenDetails">
        <Panel>
          <Row id="infoDetails">
            <Col sm={9} id="detailsLeftSide">
              <Row id="locationDetails">
                <Button className={this.props.initLocation + "Button"} id="detailsBackButton" onClick={goBack}><span id="backArrow"> <Glyphicon glyph="chevron-left"/> </span></Button>
                <strong>{this.props.location}</strong>
              </Row>

              <Row id="openDateDetails">
                Travel from <u>{startDate}</u> to <u>{endDate}</u>
              </Row>

              <Row>
                Host: {this.props.hostFirst} {this.props.hostLast}
              </Row>

              <Row id="openTravelerDetails">
                Travelers: {travelerList}
              </Row>

              <Row id="openRestrictionDetails">
                <strong><u>Restrictions</u></strong>
                <ul>
                  <li>
                    Gender: {this.props.gender}
                  </li>

                  <li>
                    Minimum Age: {this.props.minAge}
                  </li>

                  <li>
                    Maximum Age: {this.props.maxAge}
                  </li>

                </ul>
              </Row>

              <Row>
                Themes: {themeList}
              </Row>
            </Col>

            <Col sm={3} id="detailsRightSide">
              <Row>
                Goal: ${this.props.goal}
              </Row>
              <Row>
                {travelersJoin}
              </Row>
              <Row>
                <ProgressBar active bsStyle="success" now={now} label={`${now}%`} />
              </Row>

              <Row>
                <Button id="joinButton" onClick={this.props.submit}>JOIN</Button>
              </Row>

            </Col>
          </Row>

          <Row id="openDetailsImages">
            <strong><u>Possible Bookings: </u></strong>
          </Row>
          <Row id="imagesThingy">
            <Col sm={4}>
              <img src={require('../../img/goatPhoto.jpeg')}/>
            </Col>
            <Col sm={4}>
              <img src={require('../../img/goatPhoto.jpeg')}/>
            </Col>
            <Col sm={4}>
              <img src={require('../../img/goatPhoto.jpeg')}/>
            </Col>
          </Row>
          {/*}
          <Panel className={this.props.location}>
            <strong>{this.props.location}</strong><br/>
            {this.props.start}<br/>
            {this.props.end}<br/>
            host: {this.props.host}<br/>
            Joined: {this.props.joined} <br/>
            <Button onClick={this.props.submit}>Join</Button>
          </Panel>
          */}
        </Panel>
      </div>
    );
  }
}

export default PoolOpen;
