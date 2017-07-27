import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router';
import App from './App';
import Test from './Test';

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={App}/>
        <Route exact path='/test' component={Test}/>
      </Switch>
    );
  }
}

export default Main;
