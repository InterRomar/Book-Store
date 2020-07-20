import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import io from 'socket.io-client';
import { rootReducer } from './rootReducer';


// eslint-disable-next-line no-underscore-dangle
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const socket = null;

function socketMidleware ({ dispatch }) {
  return next => action => {
    if (action.type === 'GET_BOOKS_REQUEST') {
      console.log('1231231dsafsdf');
    }

    return next(action);
  };
}


export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk, socketMidleware))
);
