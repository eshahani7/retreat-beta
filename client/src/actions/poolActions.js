export function fetchPools(query) {
  return function(dispatch) {
    dispatch({type:'FETCH_POOLS'});
    fetch('/pools/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }
      else  {
        return Promise.reject({status: res.status});
      }
    }).then((body) => {
      dispatch({type: 'FETCH_POOLS_FULFILLED', payload: body});
    }).catch((e) => {
      dispatch({type: 'FETCH_POOLS_REJECTED', payload: e});
    });
  }
}

export function setInitLocation(location) {
  return { type:'SET_INIT_LOCATION', payload:location };
}

export function createPool(pool) {
  return function(dispatch) {
    dispatch({ type:'CREATE_POOLS' });

    var token = sessionStorage.getItem('authToken');
    var userHeader = new Headers();
    userHeader.append('x-auth', token);
    userHeader.append('Content-Type', 'application/json');

    fetch('/pools', {
      method: 'POST',
      headers: userHeader,
      body: JSON.stringify(pool)
    }).then((res) => {
      if(res.ok) {
        dispatch({ type:'CREATE_POOL_FULFILLED', payload: pool });
      }
      else  {
        return Promise.reject({status: res.status});
      }
    }).catch((e) => {
      dispatch({ type:'CREATE_POOL_REJECTED', payload: e });
    });
  }
}

export function fetchMyPools() {
  return function(dispatch) {
    dispatch({ type:'FETCH_POOLS' });
    var token = sessionStorage.getItem('authToken');
    var userHeader = new Headers();
    userHeader.append('x-auth', token);

    fetch('/pools/me', {
      method:'GET',
      headers: userHeader
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }
      else  {
        return Promise.reject({status: res.status});
      }
    }).then((body) => {
      dispatch({type: 'FETCH_POOLS_FULFILLED', payload: body});
    }).catch((e) => {
      dispatch({type: 'FETCH_POOLS_REJECTED', payload: e});
    });
  }
}
