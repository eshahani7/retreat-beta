import React, { Component } from 'react';

class Login extends Component {
  state = {email:'', password:'', users: [], postRes:''};

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  enterCreds() {
    var userCreds = {
      email: this.state.email,
      password: this.state.password
    }
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
