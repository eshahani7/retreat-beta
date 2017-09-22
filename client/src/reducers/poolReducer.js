export default function reducer (state = {
  initLocation: null,
  poolList: [],
  fetching: false,
  fetched: false,
  creating: false,
  created: false,
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
        poolList: action.payload.pools
      };
    }
    case 'CREATE_POOL': {
      return {...state,
        creating: true
      };
    }
    case 'CREATE_POOL_REJECTED': {
      return {...state,
        creating: false,
        error: action.payload
      };
    }
    case 'CREATE_POOL_FULFILLED': {
      return {...state,
        creating: false,
        created: true,
        poolList: action.payload.pools
      };
    }
    case 'SET_INIT_LOCATION': {
      return {...state,
        initLocation: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
