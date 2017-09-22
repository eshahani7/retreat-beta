import React, { Component } from 'react';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import NavLink from './Link.js';
import logo from '../../img/logo.png';
import '../../stylesheets/navbar.css';

class PublicNavBar extends Component {
  render() {
    return(
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" className="link">
              <img src={logo} className="Main-logo" alt="logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <Navbar.Text>
              <div className="header-text">
                R E T R E A T
              </div>
            </Navbar.Text>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              <NavLink target="/login" name="Login"/>
            </NavItem>
            <NavItem eventKey={2} href="#">
              <NavLink target="/signup" name="Sign Up"/>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

class UserNavBar extends Component {
  render() {
    return(
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" className="link">
              <img src={logo} className="Main-logo" alt="logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <Navbar.Text>
              <div className="header-text">
                R E T R E A T
              </div>
            </Navbar.Text>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              <NavLink target="/" name="My Pools"/>
            </NavItem>
            {/*<NavDropdown eventKey={2} title="i" id="infoDropdown">
              <MenuItem eventKey={2.1}><NavLink target="/ViewUser" name="My Profile"/></MenuItem>
              <MenuItem eventKey={2.2} onSelect={this.props.logout}>Log Out</MenuItem>
            </NavDropdown>*/}
            <NavItem eventKey={2} href="#">
              <NavLink target="/ViewUser" name="My Profile"/>
            </NavItem>
            <NavItem eventKey={3} href="#" onSelect={this.props.logout}>
              Logout
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export {PublicNavBar, UserNavBar};
