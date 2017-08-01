import React, { Component } from 'react';

class ViewUser extends Component {
  state = {_id:'', email: ''};

  componentWillMount() {
    var token = sessionStorage.getItem('authToken');
    console.log(token);
    var userHeader = new Headers();
    userHeader.append('x-auth', token);

    fetch('/users/me', {
      method: 'GET',
      headers: userHeader
    }).then((res) => {
      //this.setState({email: res.locals.user.email});
      //console.log(res.locals);
    }).catch((e) => {
      console.log(e);
    });
  }

  render() {
    return (
      <div className="viewUser">
        <p>
          {this.state.email}
        </p>
      </div>
    );
  }
}

export default ViewUser;
