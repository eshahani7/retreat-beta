export default function reducer (state = {
  locList:[],
  fetching: false,
  fetched: false,
  adding: false,
  added: false,
  error: null
}, action) {
  switch(action.type) {
    case 'FETCH_LOCS': {
      return {...state,
        fetching: true
      };
    }
    case 'FETCH_LOCS_REJECTED': {
      return {...state,
        fetching: false,
        error: action.payload
      };
    }
    case 'FETCH_LOCS_FULFILLED': {
      return {...state,
        fetching: false,
        fetched: true,
        locList: action.payload.locs
      };
    }
    case 'ADD_LOC': {
      return {...state,
        adding: true
      };
    }
    case 'ADD_LOC_REJECTED': {
      return {...state,
        adding: false,
        error: action.payload
      };
    }
    case 'ADD_LOC_FULFILLED': {
      return {...state,
        adding: false,
        added: true,
      };
    }
    default: {
      return state;
    }
  }
}
