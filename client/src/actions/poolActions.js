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
      console.log(e);
    });
  }
}

export function setInitLocation(location) {
  return { type:'SET_INIT_LOCATION', payload:location };
}
