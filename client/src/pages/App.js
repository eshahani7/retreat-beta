import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Main from './Main';
import Test from './Test';
import Login from './Login';
import SignUp from './SignUp';
import ViewUser from './ViewUser';
import EditUser from './EditUser';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route exact path='/test' component={Test}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={SignUp}/>
        <Route exact path='/viewuser' component={ViewUser}/>
        <Route exact path='/edituser' component={EditUser}/>
      </Switch>
    );
  }
}

export default App;
