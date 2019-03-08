import React from 'react';
// if you want to test the distribution, just uncomment the lines below
// import Overlay from '@kununu/kununu-overlay';
// import Logo from '@kununu/kununu-logo';

import Overlay from '../kununu-overlay/index';
import Logo from '../kununu-logo/index';

const Home = () => (
  <div style={{position: 'relative'}}>
    <Overlay />
    <h2>
      Welcome to kununu component dev playground!
    </h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque.
    </p>
    <div style={{backgroundColor: '#000', width: '500px', height: '500px'}}>
      <Logo
        shade="light"
        title="kununu"
        responsive
      />
    </div>
  </div>
);


export default Home;
