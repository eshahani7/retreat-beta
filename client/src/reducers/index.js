import { combineReducers } from 'redux';
import userReducer from './userReducer';
import poolReducer from './poolReducer';

export default combineReducers({
  user: userReducer,
  pool: poolReducer
});
