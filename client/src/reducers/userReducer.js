export default function reducer (state = {
  user: {},
  adding: false,
  added: false,
  fetching: false,
  fetched: false,
  isLoggedIn: false,
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
        user:action.payload
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
      }
    }
    case 'LOGIN_USER_FULFILLED': {
      return {...state,
        loggingIn:false,
        loggedIn:true,
        user:action.payload
      }
    }
    default: {
      return { ...state };
    }
  }
}
