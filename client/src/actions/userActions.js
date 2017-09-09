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

export function viewUser(user) {
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
      dispatch({type:'FETCH_USER_FULFILLED'}, payload: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        age: body.age
        gender: body.gender
      });
    }).catch((e) => {
      dispatch({type:'FETCH_USER_REJECTED', payload:e});
      console.log(e);
    });
  }
}
