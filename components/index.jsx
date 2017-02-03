import React from 'react';
import {render} from 'react-dom';

import KununuHeader from 'KununuHeader';

import 'main.scss';

const Header = KununuHeader.Header;
const HeaderNav = KununuHeader.HeaderNav;
const HeaderNavItem = KununuHeader.HeaderNavItem;

const App = (
  <div className="app-container">
    <Header title="Volle Transparenz am Arbeitsmarkt">
      <HeaderNav>
        <HeaderNavItem>
          <a href="">
            <i className="fa fa-search" aria-hidden="true" /> Suchen
          </a>
        </HeaderNavItem>
        <HeaderNavItem>
          <a href="">
            Mein kununu
          </a>
        </HeaderNavItem>
        <HeaderNavItem>
          <button className="btn btn-primary">Bewerten</button>
        </HeaderNavItem>
      </HeaderNav>
    </Header>
    <main role="main">
      <div className="container-fluid" style={{backgroundColor: '#fff'}}>
        <div className="row">
          <div className="col-lg-8">
            <h2>
              Welcome to kununu component dev playground!
            </h2>
            <p>
              jiasds
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
);

render(
  App,
  document.getElementById('client-gear-playground')
);
