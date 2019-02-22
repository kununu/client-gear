import React from 'react';
import {render} from 'react-dom';
import {Redirect, Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

import './main.scss';

import App from './app';

render(
  <BrowserRouter>
    <Switch>
      <Route
        path="/:country"
        component={App}
      />
      <Route
        exact
        path="/"
        render={() => (
          <Redirect
            from="/"
            to="/at"
          />
        )}
      />
    </Switch>
  </BrowserRouter>,
  document.getElementById('client-gear-playground'),
);
