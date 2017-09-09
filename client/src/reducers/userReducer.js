export default function reducer (state = {
  userDetails: {},
  adding: false,
  added: false,
  fetching: false,
  fetched: false,
  loggedIn: false,
  loggingIn: false,
  updating: false,
  updated: false,
  error: null
}, action) {
  switch(action.type) {
    case 'ADD_USER': {
      return {...state, adding:true};
      break;
    }
    case 'ADD_USER_REJECTED': {
      return {...state,
        adding:false,
        error:action.payload
      };
      break;
    }
    case 'ADD_USER_FULFILLED': {
      return {...state,
        adding:false,
        added:true,
        loggedIn: true,
        userDetails:action.payload
      };
      break;
    }
    case 'LOGIN_USER': {
      return {...state,
        loggingIn: true
      };
    }
    case 'LOGIN_USER_REJECTED': {
      return {...state,
        loggingIn: false,
        error: action.payload
      };
    }
    case 'LOGIN_USER_FULFILLED': {
      return {...state,
        loggingIn:false,
        loggedIn:true,
        userDetails:action.payload
      };
      break;
    }
    case 'FETCH_USER': {
      return {...state,
        fetching: true,
      };
      break;
    }
    case 'FETCH_USER_REJECTED': {
      return {...state,
        fetching: false,
        error: action.payload
      };
      break;
    }
    case 'FETCH_USER_FULFILLED': {
      return {...state,
        fetching:false,
        fetched:true,
        userDetails:action.payload
      };
      break;
    }
    case 'UPDATE_USER': {
      return {...state,
        updating: true,
      };
      break;
    }
    case 'UPDATE_USER_REJECTED': {
      return {...state,
        updating: false,
        error: action.payload
      };
      break;
    }
    case 'UPDATE_USER_FULFILLED': {
      return {...state,
        updating: false,
        updated: true,
        userDetails: action.payload
      };
      break;
    }
    default: {
      return state;
    }
  }
}
