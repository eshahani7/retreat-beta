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
        dispatch({type: 'ADD_USER_FULFILLED'});
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
        dispatch({type: 'LOGIN_USER_FULFILLED'});
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
