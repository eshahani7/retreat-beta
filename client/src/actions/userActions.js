import axios from 'axios';

export function addUser(user) {
  console.log(user);
  return function(dispatch) {
    dispatch({type: 'ADD_USER'});
    axios.post('/users', {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then((res) => {
      sessionStorage.setItem('authToken', res.headers.get('x-auth'));
      dispatch({type: 'ADD_USER_FULFILLED'});
    }).catch((e) => {
      dispatch({type: 'ADD_USER_REJECTED', payload: e});
      console.log(e);
    });
  }
}
