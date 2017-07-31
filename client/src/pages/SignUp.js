import React, { Component } from 'react';

class FormField extends Component {
  render() {
    return(
      <label>
        {this.props.label}
        <input type="text" name={this.props.name}/>
      </label>
    );
  }
}

class SignUp extends Component {
  render() {
    return (
      <div className="SignUp">
        <form>
          <FormField label="Email: " name="email"/>
          <FormField label="Password: " name="password"/>
          <FormField label="First name: " name="firstName"/>
          <FormField label="Last name: " name="lastName"/>
          <FormField label="Age: " name="age"/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default SignUp;
