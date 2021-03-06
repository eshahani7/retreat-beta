//Testing fbLogin (connectivity issues)

import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap';
import '../stylesheets/form.css';
import '../stylesheets/Login.css';

import { connect } from 'react-redux';
import { loginUser } from '../actions/userActions.js';

import FormField from './components/FormField.js';
import SubmitBtn from './components/SubmitBtn.js';

import LoginControl from './components/LoginControl.js';

const Loading = require('react-loading-animation');

const mapStateToProps = (state ) => {
  return {
    loggingIn: state.user.loggingIn,
    loggedIn: state.user.loggedIn,
    loginFailed: state.user.loginFailed
  }
}

class Login extends Component {
  state = {email:'', password:''};

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  loginUser(e) {
    e.preventDefault();
    var user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.dispatch(loginUser(user));
  }

  responseFacebook(response) {
    console.log(response)
  }

  render() {
      console.log("LOGGED IN?: " + this.props.loggedIn);
      if(this.props.loggingIn){
        return (
          <div className="Login">
            <LoginControl/>
            <Row>
              <Col md={12} id="LoginHeader">
                WELCOME BACK!
              </Col>
            </Row>
            <Row>
              <Col md={12} id="fbLoginButton">
                <FacebookLogin
                  appId="1972077469742341"
                  autoLoad={true}
                  fields="name,email,picture"
                  scope="public_profile,email"
                  callback={this.responseFacebook}
                />
              </Col>
            </Row>

            <Row>
              <Col md={12} id="LoginHeader">
               WELCOME BACK!
              </Col>
            </Row>

             <Form horizontal className="loginForm">
               <FormField
                 title="Email"
                 type="text"
                 holder="janedoe@gmail.com"
                 name="email"
                 change={this.handleChange.bind(this)}
               />
               <FormField
                 title="Password"
                 type="password"
                 holder="password"
                 name="password"
                 change={this.handleChange.bind(this)}
               />
               <SubmitBtn title="LOG IN" id="LoginButton" submit={this.loginUser.bind(this)}/>
               <Loading/>
             </Form>

             <Link to="/viewuser">View User</Link>
           </div>
        );
      }
      else if (this.props.loggedIn){
        return(
          <div className="Login">
            <LoginControl/>
            <Row>
              <Col md={12} id="LoginHeader">
                LOGGED IN!
              </Col>
            </Row>
            <Row id="loginBottom">
              <Button id="getStarted" href="/">LETS GET STARTED!</Button>
            </Row>
          </div>
        );
      }
      else if (this.props.loginFailed){
        return(
          <div className="Login">
            <LoginControl/>
            <Row>
              <Col md={12} id="LoginHeader">
                WELCOME BACK!
              </Col>
            </Row>
            <Row>
              <Col md={12} id="fbLoginButton">
                <FacebookLogin
                  appId="1972077469742341"
                  autoLoad={true}
                  fields="name,email,picture"
                  scope="public_profile,email"
                  callback={this.responseFacebook}
                />
              </Col>
            </Row>

            <Row>
              <Col md={12} id="LoginHeader">
               LOGIN FAILED. PLEASE TRY AGAIN
              </Col>
            </Row>

             <Form horizontal className="loginForm">
               <FormField
                 title="Email"
                 type="text"
                 holder="janedoe@gmail.com"
                 name="email"
                 change={this.handleChange.bind(this)}
               />
               <FormField
                 title="Password"
                 type="password"
                 holder="password"
                 name="password"
                 change={this.handleChange.bind(this)}
               />
               <SubmitBtn title="LOG IN" id="LoginButton" submit={this.loginUser.bind(this)}/>
             </Form>

             <Link to="/viewuser">View User</Link>
           </div>
        );
      }
      else{
        return (
          <div className="Login">
            <LoginControl/>
            <Row>
              <Col md={12} id="LoginHeader">
                WELCOME BACK!
              </Col>
            </Row>
            <Row>
              <Col md={12} id="fbLoginButton">
                <FacebookLogin
                  appId="1972077469742341"
                  autoLoad={true}
                  fields="name,email,picture"
                  scope="public_profile,email"
                  callback={this.responseFacebook}
                />
              </Col>
            </Row>

            <Row>
              <Col md={12} id="LoginHeader">
               WELCOME BACK!
              </Col>
            </Row>

             <Form horizontal className="loginForm">
               <FormField
                 title="Email"
                 type="text"
                 holder="janedoe@gmail.com"
                 name="email"
                 change={this.handleChange.bind(this)}
               />
               <FormField
                 title="Password"
                 type="password"
                 holder="password"
                 name="password"
                 change={this.handleChange.bind(this)}
               />
               <SubmitBtn title="LOG IN" id="LoginButton" submit={this.loginUser.bind(this)}/>
             </Form>

             <Link to="/viewuser">View User</Link>
           </div>




          // <script>
          //   // This is called with the results from from FB.getLoginStatus().
          //   function statusChangeCallback(response) {
          //     console.log('statusChangeCallback');
          //     console.log(response);
          //     // The response object is returned with a status field that lets the
          //     // app know the current login status of the person.
          //     // Full docs on the response object can be found in the documentation
          //     // for FB.getLoginStatus().
          //     if (response.status === 'connected') {
          //       // Logged into your app and Facebook.
          //       testAPI();
          //     } else {
          //       // The person is not logged into your app or we are unable to tell.
          //       document.getElementById('status').innerHTML = 'Please log ' +
          //       'into this app.';
          //     }
          //   }
          //
          //   // This function is called when someone finishes with the Login
          //   // Button.  See the onlogin handler attached to it in the sample
          //   // code below.
          //   function checkLoginState() {
          //     FB.getLoginStatus(function(response) {
          //       statusChangeCallback(response);
          //     });
          //   }
          //
          //   window.fbAsyncInit = function() {
          //     FB.init({
          //       appId      : '1972077469742341',
          //       cookie     : true,  // enable cookies to allow the server to access
          //                           // the session
          //       xfbml      : true,  // parse social plugins on this page
          //       version    : 'v2.10' // use graph api version 2.8
          //     });
          //
          //     // Now that we've initialized the JavaScript SDK, we call
          //     // FB.getLoginStatus().  This function gets the state of the
          //     // person visiting this page and can return one of three states to
          //     // the callback you provide.  They can be:
          //     //
          //     // 1. Logged into your app ('connected')
          //     // 2. Logged into Facebook, but not your app ('not_authorized')
          //     // 3. Not logged into Facebook and can't tell if they are logged into
          //     //    your app or not.
          //     //
          //     // These three cases are handled in the callback function.
          //
          //     FB.getLoginStatus(function(response) {
          //       statusChangeCallback(response);
          //     });
          //
          //   };
          //
          //   // Load the SDK asynchronously
          //   (function(d, s, id) {
          //     var js, fjs = d.getElementsByTagName(s)[0];
          //     if (d.getElementById(id)) return;
          //     js = d.createElement(s); js.id = id;
          //     js.src = "//connect.facebook.net/en_US/sdk.js";
          //     fjs.parentNode.insertBefore(js, fjs);
          //   }(document, 'script', 'facebook-jssdk'));
          //
          //   // Here we run a very simple test of the Graph API after login is
          //   // successful.  See statusChangeCallback() for when this call is made.
          //   function testAPI() {
          //     console.log('Welcome!  Fetching your information.... ');
          //     FB.api('/me', function(response) {
          //       console.log('Successful login for: ' + response.name);
          //       document.getElementById('status').innerHTML =
          //       'Thanks for logging in, ' + response.name + '!';
          //     });
          //   }
          // </script>
          //
          // <fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
          // </fb:login-button>
          //
          // <div id="status">
          // </div>
          //
          // <div className="Login">
          //   <h1>
          //     FACEBOOK LOGIN HERE
          //   </h1>
          // </div>
        );
      }


    }
  }

  export default connect(mapStateToProps)(Login);
