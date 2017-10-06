import { fetchBooking } from './bookingActions';
import { findUser } from './userActions';

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

export function fetchPoolsAdmin() {
  var token = sessionStorage.getItem('authToken');
  var userHeader = new Headers();
  userHeader.append('x-auth', token);

  return function(dispatch) {
    dispatch({type:'FETCH_POOLS'});
    fetch('/pools/admin/list', {
      method: 'GET',
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

export function selectPool(poolId) {
  return function(dispatch) {
    var token = sessionStorage.getItem('authToken');
    var userHeader = new Headers();
    userHeader.append('x-auth', token);

    dispatch({ type:'SELECT_POOL '});
    fetch(`/pools/details/${poolId}`, {
      method:'GET'
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }
      else  {
        return Promise.reject({status: res.status});
      }
    }).then((body) => {
      dispatch({type: 'SELECT_POOL_FULFILLED', payload: body});
      //FETCH BOOKING DETAILS
      if(body.poolBooked) {
        fetchBooking(dispatch, poolId, userHeader);
      }
      //FETCH HOST DETAILS
      findUser(dispatch, body._creator);
      //CHECK IF CURRENT USER IN BOOKING
      checkUserInPool(dispatch, poolId, userHeader);
    }).catch((e) => {
      dispatch({type: 'SELECT_POOL_REJECTED', payload: e});
    });
  }
}

//helper function for select pool
function checkUserInPool(dispatch, poolId, userHeader) {
  dispatch({type:'CHECK_JOINED'});
  fetch(`/pools/in/${poolId}`, {
    method: 'GET',
    headers: userHeader,
  }).then((res) => {
    if(res.status === 200) {
      dispatch({type:'CHECK_JOINED_FULFILLED', payload: true});
    } else {
      dispatch({type:'CHECK_JOINED_FULFILLED', payload: false});
    }
  }).catch((e) => {
    dispatch({type:'CHECK_JOINED_REJECTED', payload: e});
  });
}

export function joinPool(poolId) {
  return function(dispatch) {
    dispatch({ type:'JOIN_POOL '});
    var token = sessionStorage.getItem('authToken');
    var userHeader = new Headers();
    userHeader.append('x-auth', token);

    fetch(`/pools/join/${poolId}`, {
      method:'POST',
      headers: userHeader
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }
      else  {
        return Promise.reject({status: res.status});
      }
    }).then((body) => {
      dispatch({type: 'JOIN_POOL_FULFILLED', payload: body});
    }).catch((e) => {
      dispatch({type: 'JOIN_POOL_REJECTED', payload: e});
    })
  }
}
