import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';

import Main from './Main';
import Test from './Test';
import Login from './Login';
import SignUp from './SignUp';
import ViewUser from './ViewUser';
import EditUser from './EditUser';
import PoolListContainer from './PoolListContainer';
import CreatePool from './CreatePool';

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
        <Route exact path='/pools' component={PoolListContainer}/>
        <Route exact path='/create' component={CreatePool}/>
        <Route exact path='/test' component={Test}/>
      </Switch>
    );
  }
}

export default App;
