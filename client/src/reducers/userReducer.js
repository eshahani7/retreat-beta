export default function reducer (state = {
  userDetails: {},
  adding: false,
  added: false,
  fetching: false,
  fetched: false,
  loggedIn: false,
  loggingIn: false,
  loggingOut: false,
  updating: false,
  updated: false,
  error: null
}, action) {
  switch(action.type) {
    case 'ADD_USER': {
      return {...state, adding:true};
    }
    case 'ADD_USER_REJECTED': {
      return {...state,
        adding:false,
        error:action.payload
      };
    }
    case 'ADD_USER_FULFILLED': {
      return {...state,
        adding:false,
        added:true,
        loggedIn: true,
        userDetails:action.payload
      };
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
    }
    case 'LOGOUT_USER': {
      return {...state,
        loggingOut: true
      };
    }
    case 'LOGOUT_USER_REJECTED': {
      return {...state,
        loggingOut: false,
        error: action.payload
      };
    }
    case 'LOGOUT_USER_FULFILLED': {
      return {...state,
        loggingOut:false,
        loggedIn:false,
        userDetails:action.payload
      };
    }
    case 'FETCH_USER': {
      return {...state,
        fetching: true,
      };
    }
    case 'FETCH_USER_REJECTED': {
      return {...state,
        fetching: false,
        error: action.payload
      };
    }
    case 'FETCH_USER_FULFILLED': {
      return {...state,
        fetching:false,
        fetched:true,
        userDetails:action.payload
      };
    }
    case 'UPDATE_USER': {
      return {...state,
        updating: true,
      };
    }
    case 'UPDATE_USER_REJECTED': {
      return {...state,
        updating: false,
        error: action.payload
      };
    }
    case 'UPDATE_USER_FULFILLED': {
      return {...state,
        updating: false,
        updated: true,
        userDetails: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
