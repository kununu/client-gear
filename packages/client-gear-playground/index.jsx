import React from 'react';
import {render} from 'react-dom';
import {Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom'
// import 'font-awesome-webpack';

import './main.scss';

import App from './app';

render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/us/test" component={App} />
      <Route path="/:country(/:menuItem)" component={App} />
    </div>
  </BrowserRouter>,
  document.getElementById('client-gear-playground'),
);
