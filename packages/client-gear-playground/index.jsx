import React from 'react';
import {render} from 'react-dom';
import './main.scss';

import {Header, HeaderNav, HeaderNavItem} from '../kununu-header';
import {Footer, FooterNav, FooterNavItem} from '../kununu-footer';

const infoText = (
  <span>Auf kununu wurden bereits <b className="text-green">1.475.000</b> authentische Erfahrungsberichte über Gehalt, Betriebsklima und Bewerbungsprozesse zu <b className="text-green">297.000</b> Unternehmen abgegeben</span>
);

const App = (
  <div className="appContainer">
    <Header title="Volle Transparenz am Arbeitsmarkt">
      <HeaderNav>
        <HeaderNavItem>
          <a href="">
            <span className="hidden-xs"><i className="fa fa-search hidden-xs" aria-hidden="true" />&nbsp; Suchen</span>
            <i className="fa fa-search visible-xs" aria-hidden="true" />
          </a>
        </HeaderNavItem>
        <HeaderNavItem>
          <a className="" href="/">
            <span className="hidden-xs">Mein kununu </span>
            <i className="fa fa-user visible-xs" />
          </a>
        </HeaderNavItem>
        <HeaderNavItem>
          <a href="/" className="btn btn-dd-sm btn-primary">Firma bewerten</a>
        </HeaderNavItem>
      </HeaderNav>
    </Header>
    <main role="main">
      <div className="container-fluid">
        <div style={{backgroundColor: '#fff', padding: '10px 20px'}}>
          <h2>
            Welcome to kununu component dev playground!
          </h2>
          <p>
            jiasds
          </p>
        </div>
      </div>
    </main>
    <Footer
      infoText={infoText}
      tuv={{
        alt: 'Hi',
        src: 'https://assets.kununu.com/build/img/tuev-saarland-siegel.svg',
        title: 'Hi hi hi',
      }}
    >
      <FooterNav
        id="about kununu"
        title="Über kununu"
      >
        <FooterNavItem>
          <a href="asdsad">Was ist kununu</a>
        </FooterNavItem>
        <FooterNavItem>
          <a href="asdasd">Karriere</a>
        </FooterNavItem>
        <FooterNavItem>
          <a href="asdsad">Presse</a>
        </FooterNavItem>
        <FooterNavItem>
          <a href="asdsad">News</a>
        </FooterNavItem>
      </FooterNav>

      <FooterNav
        id="about kununu"
        title="Für Mitarbeiter"
      >
        <FooterNavItem active>
          <a href="asdsad">Gehaltsrechner</a>
        </FooterNavItem>
        <FooterNavItem>
          <a href="asdasd">Hilfe & Kontakt</a>
        </FooterNavItem>
      </FooterNav>

      <FooterNav
        id="about kununu"
        title="Für Unternehmen"
      >
        <FooterNavItem>
          <a href="asdasd">Unsere Produkte</a>
        </FooterNavItem>
        <FooterNavItem>
          <a href="asdasd">FAQ</a>
        </FooterNavItem>
        <FooterNavItem>
          <a href="asdsad">Kontakt</a>
        </FooterNavItem>
        <FooterNavItem>
          <a href="asdasd">Toolkit</a>
        </FooterNavItem>
      </FooterNav>

      <FooterNav
        type="row"
        id="about kununu"
      >
        <FooterNavItem>
          <a href="asdasd">AGB</a>
        </FooterNavItem>
        <FooterNavItem>
          <a href="asdasd">Impressum</a>
        </FooterNavItem>
        <FooterNavItem>
          <a href="asdsad">Datenschutz</a>
        </FooterNavItem>
        <FooterNavItem active>
          <a href="asdasd">Disclaimer</a>
        </FooterNavItem>
        <FooterNavItem>
          <a href="asdasd">Sitemap</a>
        </FooterNavItem>
      </FooterNav>
    </Footer>
  </div>
);

render(
  App,
  document.getElementById('client-gear-playground'),
);
