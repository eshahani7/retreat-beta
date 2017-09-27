export default function reducer (state = {
  booking: false,
  booked: false,
  fetching: false,
  fetched: false,
  booking: {},
  location: {},
  error: null
}, action) {
  switch(action.type) {
    case 'BOOK': {
      return {...state,
        booking: true
      };
    }
    case 'BOOK_REJECTED': {
      return {...state,
        booking: false,
        error: action.payload
      };
    }
    case 'BOOK_FULFILLED': {
      return {...state,
        booking: false,
        booked: true,
      };
    }
    case 'FETCH_BOOKING': {
      return {...state,
        fetching: true
      };
    }
    case 'FETCH_BOOKING_REJECTED': {
      return {...state,
        fetching: false,
        error: action.payload
      };
    }
    case 'FETCH_BOOKING_FULFILLED': {
      return {...state,
        fetching: false,
        fetched: true,
        location: action.payload[0],
        booking: action.payload[1]
      };
    }
    default: {
      return state;
    }
  }
}
