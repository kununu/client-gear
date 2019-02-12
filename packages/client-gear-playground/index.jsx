import React from 'react';
import {render} from 'react-dom';
import {Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom'

import './main.scss';

import App from './app';

render(
  <BrowserRouter>
    <Route path="/:country" component={App} />
  </BrowserRouter>,
  document.getElementById('client-gear-playground'),
);
