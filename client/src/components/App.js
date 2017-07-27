import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router';
import Main from './Main';
import Test from './Test';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route exact path='/test' component={Test}/>
      </Switch>
    );
  }
}

export default App;
