export function addUser(user) {
  return function(dispatch) {
    dispatch({type: 'ADD_USER'});
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then((res) => {
      if(res.ok) {
        sessionStorage.setItem('authToken', res.headers.get('x-auth'));
        dispatch({type: 'ADD_USER_FULFILLED', payload: user});
      }
      else  {
        return Promise.reject({status: res.status});
      }
    }).catch((e) => {
      dispatch({type: 'ADD_USER_REJECTED', payload: e});
      console.log(e);
    });
  }
}

export function loginUser(user) {
  return function(dispatch) {
    dispatch({type: 'LOGIN_USER'});
    fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then((res) => {
      if(res.ok) {
        sessionStorage.setItem('authToken', res.headers.get('x-auth'));
        dispatch({type: 'LOGIN_USER_FULFILLED', payload: user});
      }
      else {
        return Promise.reject({status: res.status});
      }
    }).catch((e) => {
      dispatch({type: 'LOGIN_USER_REJECTED', payload: e});
      console.log(e);
    });
  }
}

export function viewUser() {
  return function(dispatch) {
    dispatch({type: 'FETCH_USER'});

    var token = sessionStorage.getItem('authToken');
    var userHeader = new Headers();
    userHeader.append('x-auth', token);

    fetch('/users/me', {
      method: 'GET',
      headers: userHeader
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }
      else {
        return Promise.reject({status: res.status});
      }
    }).then((body) => {
      dispatch({type:'FETCH_USER_FULFILLED', payload: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        age: body.age}
      })
    }).catch((e) => {
      dispatch({type:'FETCH_USER_REJECTED', payload:e});
      console.log(e);
      });
  }
}

export function logoutUser() {
  var token = sessionStorage.getItem('authToken');
  var userHeader = new Headers();
  userHeader.append('x-auth', token);

  return function(dispatch) {
    dispatch({type:'LOGOUT_USER'});
    fetch('/users/me/token', {
      method: 'DELETE',
      headers: userHeader
    }).then((res) => {
      if(res.ok) {
        sessionStorage.removeItem('authToken');
        dispatch({type:'LOGOUT_USER_FULFILLED'});
      }
      else {
        return Promise.reject({status: res.status});
      }
    }).catch((e) => {
      dispatch({type:'LOGOUT_USER_REJECTED', payload:e});
    });
  }
}

export function refreshLogin() {
  if(sessionStorage.getItem('authToken') != null) {
    console.log('AuthToken: ' + sessionStorage.getItem('authToken'));
    return {
      type: 'REFRESH_LOGIN',
      payload: true
    };
  }
  else {
    return {
      type: 'REFRESH_LOGIN',
      payload: false
    }
  }
}

//-------CALLED IN POOL ACTIONS------//
export function findUser(dispatch, userID){
  dispatch({type: 'FIND_USER'});

  fetch(`/users/${userID}`, {
    method: 'GET'
  }).then((res) => {
    if(res.ok) {
      return res.json();
    }
    else{
      return Promise.reject({status: res.status});
    }
  }).then((body) => {
    dispatch({type: 'FIND_USER_FULFILLED', payload: {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      age: body.age}
    });
  }).catch((e) => {
    dispatch({type: 'FIND_USER_REJECTED', payload: e});
  });
}
