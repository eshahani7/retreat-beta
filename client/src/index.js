import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './stylesheets/index.css';
import Main from './components/Main';
import registerServiceWorker from './registerServiceWorker';

render((
  <BrowserRouter>
    <Main />
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
