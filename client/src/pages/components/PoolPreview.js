import React, { Component } from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import NavLink from './Link';

class PoolPreview extends Component {
  onSelect() {
    console.log(this.props.id);
    this.props.select(this.props.id);
  }

  adjustStartDate(date){
    var startDay = date._d.getDate()+1;
    var startMonth = date._d.getMonth()+1;
    var startYear = date._d.getYear()+1900;
    var fullStartDate = startDay + "/" + startMonth + "/" + startYear;
    console.log(fullStartDate);
    return fullStartDate;
  }

  adjustEndDate(date){
    var endDay = date._d.getDate()+1;
    var endMonth = date._d.getMonth()+1;
    var endYear = date._d.getYear()+1900;
    var fullEndDate = endDay + "/" + endMonth + "/" + endYear;
    console.log(fullEndDate);
    return fullEndDate;
  }

  render() {
    const linkTarget = '/pool/details/' + this.props.id;

    var startDate = new Date(this.props.startDate);
    var endDate = new Date(this.props.endDate);

    return(
      <Panel className={this.props.className}>
        <strong>{this.props.location}</strong><br/>
        {startDate.toDateString()}<br/>
        {endDate.toDateString()}<br/>
        host: {this.props.host}<br/>
        <Link to={linkTarget} onClick={this.onSelect.bind(this)}>Details</Link>
      </Panel>
    );
  }
}

export default PoolPreview;
