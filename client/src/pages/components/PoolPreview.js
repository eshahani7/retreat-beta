import React, { Component } from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import NavLink from './Link';

class PoolPreview extends Component {
  onSelect() {
    console.log(this.props.id);
    this.props.select(this.props.id);
  }

  render() {
    var startDate = new Date(this.props.startDate);
    var endDate = new Date(this.props.endDate);

    return(
      <Panel className={this.props.className}>
        <strong>{this.props.location}</strong><br/>
        {startDate.toDateString()}<br/>
        {endDate.toDateString()}<br/>
        host: {this.props.host}<br/>
      <NavLink target={this.props.linkTarget} name="Details"/>
      </Panel>
    );
  }
}

export default PoolPreview;
