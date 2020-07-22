import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './pages/App';
import * as serviceWorker from './serviceWorker';

import './style.css';

import { store } from './store/index';

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
),
document.getElementById('root'),);

serviceWorker.unregister();
