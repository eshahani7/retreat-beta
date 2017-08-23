import React, { Component } from 'react';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';

import NavLink from './Link.js';
import logo from '../../img/logo.png';

class PublicNavBar extends Component {
  render() {
    return(
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">
              <img src={logo} className="Main-logo" alt="logo" />
            </a>
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
            <a href="#">
              <img src={logo} className="Main-logo" alt="logo" />
            </a>
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
            <NavItem eventKey={2} href="#">
              <NavLink target="/" name="My Profile"/>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export {PublicNavBar, UserNavBar};
