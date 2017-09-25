export function fetchLocs(city) {
  return function(dispatch) {
    dispatch({type:'FETCH_LOCS'});

    var token = sessionStorage.getItem('authToken');
    var userHeader = new Headers();
    userHeader.append('x-auth', token);
    userHeader.append('Content-Type', 'application/json');

    fetch('/locations', {
      method: 'POST',
      headers: userHeader,
      body: JSON.stringify(city)
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }
      else  {
        return Promise.reject({status: res.status});
      }
    }).then((body) => {
      dispatch({type: 'FETCH_LOCS_FULFILLED', payload: body});
    }).catch((e) => {
      dispatch({type: 'FETCH_LOCS_REJECTED', payload: e});
    });
  }
}
