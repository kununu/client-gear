import React from 'react';
import {render} from 'react-dom';

import Logo from 'Logo';

import 'main.scss';

const App = (
  <div className="app-container container">
    <Logo link={<a href="/">kununu gmbH</a>} />
  </div>
);

render(
  App,
  document.getElementById('client-gear-playground')
);
