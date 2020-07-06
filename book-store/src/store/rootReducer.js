import current_user from './current_user/reducers';

const { combineReducers } = require('redux');

export const rootReducer = combineReducers({
  current_user,
});
