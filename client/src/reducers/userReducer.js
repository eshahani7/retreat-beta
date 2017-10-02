export default function reducer (state = {
  userDetails: {},
  userInfo: {},
  adding: false,
  added: false,
  addFailed: false,
  fetching: false,
  fetched: false,
  finding: false,
  found: false,
  loggedIn: false,
  loggingIn: false,
  loginFailed: false,
  loggingOut: false,
  updating: false,
  updated: false,
  error: null
}, action) {
  switch(action.type) {
    case 'ADD_USER': {
      return {...state, addFailed: false, adding:true};
    }
    case 'ADD_USER_REJECTED': {
      return {...state,
        adding:false,
        addFailed: true,
        error:action.payload
      };
    }
    case 'ADD_USER_FULFILLED': {
      return {...state,
        addFailed: false,
        adding:false,
        added:true,
        loggedIn: true,
        userDetails:action.payload
      };
    }
    case 'LOGIN_USER': {
      return {...state,
        loginFailed: false,
        loggingIn: true
      };
    }
    case 'LOGIN_USER_REJECTED': {
      return {...state,
        loggingIn: false,
        loginFailed: true,
        error: action.payload
      };
    }
    case 'LOGIN_USER_FULFILLED': {
      return {...state,
        loggingIn:false,
        loginFailed: false,
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
    case 'FIND_USER': {
      return {...state,
        finding: true,
      };
    }
    case 'FIND_USER_REJECTED': {
      return {...state,
        finding: false,
        error: action.payload
      };
    }
    case 'FIND_USER_FULFILLED': {
      return {...state,
        finding: false,
        found: true,
        userInfo: action.payload
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
    case 'REFRESH_LOGIN' : {
      return {...state,
        loggedIn: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
