export function bookPool(details) {
  return function(dispatch) {
    dispatch({type:'BOOK'});

    var token = sessionStorage.getItem('authToken');
    var userHeader = new Headers();
    userHeader.append('x-auth', token);
    userHeader.append('Content-Type', 'application/json');

    fetch('/bookings', {
      method: 'POST',
      headers: userHeader,
      body: JSON.stringify(details)
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }
      else  {
        return Promise.reject({status: res.status});
      }
    }).then((body) => {
      dispatch({type: 'BOOK_FULFILLED'});
    }).catch((e) => {
      dispatch({type: 'BOOK_REJECTED', payload: e});
    });
  }
}

//------------CALLED IN POOL ACTIONS-------//
export function fetchBooking(dispatch, poolId, userHeader) {
  dispatch({type: 'FETCH_BOOKING'});
  fetch(`/bookings/details/${poolId}`, {
    method: 'GET',
    headers: userHeader
  }).then((res) => {
    if(res.ok) {
      return res.json();
    }
    else  {
      console.log('sad');
      return Promise.reject({status: res.status});
    }
  }).then((body) => {
    dispatch({type: 'FETCH_BOOKING_FULFILLED', payload: body});
  }).catch((e) => {
    dispatch({type: 'FETCH_BOOKING_REJECTED', payload: e});
  });
}
