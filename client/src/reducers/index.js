import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import notificationsReducer from './notificationsReducer';
import deviseReducer from './deviseReducer';

const rootReducer = combineReducers({
  devises: deviseReducer,
  account: accountReducer,
  notifications: notificationsReducer
});

export default rootReducer;
