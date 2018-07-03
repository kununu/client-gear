import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route, hashHistory} from 'react-router-dom';
import 'font-awesome-webpack';

import './main.scss';

import App from './app';

const getRoutes = () => (
  <Route path="/" component={App}>
    <Route path="/us/test" component={App} />
    <Route path="/:country(/:menuItem)" component={App} />
  </Route>
);


render(
  <BrowserRouter
    routes={getRoutes()}
    history={hashHistory}
  />,
  document.getElementById('client-gear-playground'),
);
