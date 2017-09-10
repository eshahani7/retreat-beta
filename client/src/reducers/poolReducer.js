export default function reducer (state = {
  poolsList: [],
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch(action.type) {
    case 'FETCH_POOLS': {
      return {...state,
        fetching: true
      };
    }
    case 'FETCH_POOLS_REJECTED': {
      return {...state,
        fetching: false,
        error: action.payload
      };
    }
    case 'FETCH_POOLS_FULFILLED': {
      return {...state,
        fetching: false,
        fetched: true,
        poolsList: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
