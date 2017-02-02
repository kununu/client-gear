import React from 'react';
import {render} from 'react-dom';

import Logo from 'components/Logo';

import 'main.scss';

const App = (
  <div className="app-container container">
    <Logo />
  </div>
);

render(
  App,
  document.getElementById('client-gear-playground')
);
