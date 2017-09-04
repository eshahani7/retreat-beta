import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';

import App from './pages/App';
import registerServiceWorker from './registerServiceWorker';
import store from "./store"

import 'bootstrap/dist/css/bootstrap.css';
import './stylesheets/index.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    	<App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
