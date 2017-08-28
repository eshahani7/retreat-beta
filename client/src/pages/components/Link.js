import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from 'react-bootstrap';

class NavLink extends Component {
  render() {
    return(
      <Link to={this.props.target} className="link">{this.props.name}</Link>
    );
  }
}

export default NavLink;
