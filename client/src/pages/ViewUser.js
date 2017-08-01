import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class ViewUser extends Component {
  state = {_id:'', email: '', password:'', firstName:'', lastName:''};

  componentWillMount() {
    var token = sessionStorage.getItem('authToken');
    console.log(token);
    var userHeader = new Headers();
    userHeader.append('x-auth', token);

    fetch('/users/me', {
      method: 'GET',
      headers: userHeader
    }).then((res) => {
      return res.json();
    }).then((body) => {
      this.setState({
        _id: body._id,
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName
      });
      console.log(body);
    }).catch((e) => {
      console.log(e);
    });
  }

  render() {
    return (
      <div className="viewUser">
        <p>
          {this.state.email} <br/>
          {this.state.firstName} <br/>
          {this.state.lastName} <br/>
        </p>
        <Link to="/edituser">Edit User</Link>
      </div>
    );
  }
}

export default ViewUser;
