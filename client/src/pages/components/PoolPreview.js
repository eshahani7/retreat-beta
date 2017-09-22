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
    const linkTarget = '/pool/details/' + this.props.id;
    return(
      <Panel>
        {this.props.location}<br/>
        {this.props.startDate}<br/>
        {this.props.endDate}<br/>
        host: {this.props.host}<br/>
        <Link to={linkTarget} onClick={this.onSelect.bind(this)}>Details</Link>
      </Panel>
    );
  }
}

export default PoolPreview;
