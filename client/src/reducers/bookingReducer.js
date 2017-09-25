export default function reducer (state = {
  booking: false,
  booked: false,
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
    default: {
      return state;
    }
  }
}
