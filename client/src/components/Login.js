import React, { Component } from 'react';

class Login extends Component {
  state = {email:'', password:'', authToken:''};

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  enterCreds(e) {
    e.preventDefault();
    fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    }).then((res) => {
      //this.setState({authToken: res.headers.get('x-auth')});
      sessionStorage.setItem('authToken', res.headers.get('x-auth'));
    }).catch((e) => {
      console.log(e);
    });
  }

  render() {
    return (
      <div className="Login">
        <form>
          <label>
            Email:
            <input type="text" name="email" value={this.state.email} placeholder="janedoe@example.com"
              onChange={this.handleChange.bind(this)}/>
          </label>
          <label>
            Password:
            <input name="password" type="text" value={this.state.password}
              onChange={this.handleChange.bind(this)}/>
          </label>
          <input type="submit" value="Submit" onClick={this.enterCreds.bind(this)}/>
        </form>
      </div>
    );
  }
}

export default Login;
