export default function reducer (state = {
  initLocation: null,
  poolList: [],
  hostList: [],
  selectedPool: {},
  fetching: false,
  fetched: false,
  selecting: false,
  selected: false,
  creating: false,
  created: false,
  createFailed: false,
  joining: false,
  joined: false,
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
        createFailed: false,
        creating: true
      };
    }
    case 'CREATE_POOL_REJECTED': {
      return {...state,
        creating: false,
        createFailed: true,
        error: action.payload
      };
    }
    case 'CREATE_POOL_FULFILLED': {
      return {...state,
        createFailed: false,
        creating: false,
        created: true,
        poolList: action.payload.pools
      };
    }
    case 'SELECT_POOL': {
      return {...state,
        selecting: true
      };
    }
    case 'SELECT_POOL_REJECTED': {
      return {...state,
        selecting: false,
        error: action.payload
      };
    }
    case 'SELECT_POOL_FULFILLED': {
      return {...state,
        selecting: false,
        selected: true,
        selectedPool: action.payload
      };
    }
    case 'JOIN_POOL': {
      return {...state,
        joining: true
      };
    }
    case 'JOIN_POOL_REJECTED': {
      return {...state,
        joining: false,
        error: action.payload
      };
    }
    case 'JOIN_POOL_FULFILLED': {
      return {...state,
        joining: false,
        joined: true,
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
