export function searchPools(query) {
  return function(dispatch) {
    dispatch({type:'FETCH_POOLS'});
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    }).then((res) => {
      if(res.ok) {
        dispatch({type: 'FETCH_POOLS_FULFILLED', payload: query});
      }
      else  {
        return Promise.reject({status: res.status});
      }
    }).catch((e) => {
      dispatch({type: 'FETCH_POOLS_REJECTED', payload: e});
      console.log(e);
    });
  }
}
