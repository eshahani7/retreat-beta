import { combineReducers } from 'redux';
import userReducer from './userReducer';
import poolReducer from './poolReducer';
import locReducer from './locReducer';
import bookingReducer from './bookingReducer';

export default combineReducers({
  user: userReducer,
  pool: poolReducer,
  loc: locReducer,
  booking: bookingReducer
});
