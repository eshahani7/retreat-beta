import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Main from './Main';
import Test from './Test';
import Login from './Login';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route exact path='/test' component={Test}/>
        <Route exact path='/login' component={Login}/>
      </Switch>
    );
  }
}

export default App;
