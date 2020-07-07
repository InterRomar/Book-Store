import current_user from './current_user/reducers';
import book_store from './book_store/reducers';
import categories_store from './categories_store/reducers';

const { combineReducers } = require('redux');

export const rootReducer = combineReducers({
  current_user,
  book_store,
  categories_store,
});
