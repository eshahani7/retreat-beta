import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import Main from './Main';
import Test from './Test';
import Login from './Login';
import SignUp from './SignUp';
import ViewUser from './ViewUser';
import EditUser from './EditUser';
import PoolListContainer from './PoolListContainer';
import CreatePool from './CreatePool';
import MyPools from './MyPools';
import PoolDetails from './PoolDetails';
import AdminList from './AdminList';
import AdminSelect from './AdminSelect';

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
        <Route path='/pools' component={PoolListContainer}/>
        <Route exact path='/create' component={CreatePool}/>
        <Route exact path='/mypools' component={MyPools}/>
        <Route path='/pool/details' component={PoolDetails}/>
        <Route exact path='/admin' component={AdminList}/>
        <Route path='/admin/book' component={AdminSelect}/>
        <Route exact path='/test' component={Test}/>
      </Switch>
    );
  }
}

export default App;
