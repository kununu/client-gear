import React from 'react';
import {render} from 'react-dom';
import {DropDown} from 'nukleus';

import './main.scss';

import {Header, HeaderNav, HeaderNavItem} from '../kununu-header';
import {Footer, FooterNav} from '../kununu-footer';

const at = require('./img/at.gif');
const ch = require('./img/ch.gif');
const de = require('./img/de.gif');
const us = require('./img/us.gif');


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
        menuClass="visible-xs"
        id="country picker"
        title="Country"
        dynamicNav
        items={[
          {
            active: false,
            icon: <img title="Swiss Flag" alt="Swiss Flag" src={at} />,
            link: <a href="/">test</a>,
            value: 'Österreich',
          },
          {
            active: true,
            icon: <img title="Swiss Flag" alt="Swiss Flag" src={de} />,
            link: <a href="/">test</a>,
            value: 'Deutschland',
          },
          {
            active: false,
            icon: <img title="Swiss Flag" alt="Swiss Flag" src={ch} />,
            link: <a href="/">test</a>,
            value: 'Switzerland',
          },
          {
            active: false,
            icon: <img title="Swiss Flag" alt="Swiss Flag" src={us} />,
            link: <a>test</a>,
            value: 'United States',
          },
        ]}
      />

      <FooterNav
        id="about kununu"
        title="Über kununu"
        items={[
          {
            active: false,
            link: <a href="/">test</a>,
            value: 'Was ist kununu',
          },
          {
            active: false,
            link: <a href="/">test</a>,
            value: 'Karriere',
          },
          {
            active: false,
            link: <a href="/">test</a>,
            value: 'Presse',
          },
          {
            active: false,
            link: <a href="/">test</a>,
            value: 'News',
          },
        ]}
      />

      <FooterNav
        id="about kununu"
        title="Für Mitarbeiter"
        items={[
          {
            active: false,
            link: <a href="/">test</a>,
            value: 'Gehaltsrechner',
          },
          {
            active: false,
            link: <a href="/">test</a>,
            value: 'Hilfe & Kontakt',
          },
        ]}
      />

      <FooterNav
        id="about kununu"
        title="Für Unternehmen"
        items={[
          {
            active: false,
            link: <a href="/">test</a>,
            value: 'Unsere Produkte',
          },
          {
            active: false,
            link: <a href="/">test</a>,
            value: 'FAQ',
          },
          {
            active: false,
            link: <a href="/">test</a>,
            value: 'Kontakt',
          },
          {
            active: false,
            link: <a href="/">test</a>,
            value: 'Toolkit',
          },
        ]}
      />

      <FooterNav
        type="row"
        id="about kununu"
        items={[
          {
            active: false,
            link: <a href="/">test</a>,
            value: 'AGB',
          },
          {
            active: false,
            link: <a href="/">test</a>,
            value: 'Impressum',
          },
          {
            active: false,
            link: <a href="/">test</a>,
            value: 'Datenschutz',
          },
          {
            active: false,
            link: <a href="/">test</a>,
            value: 'Disclaimer',
          },
          {
            active: false,
            link: <a href="/">test</a>,
            value: 'Sitemap',
          },
        ]}
      />

      <DropDown
        position="top"
        items={
        [{
          active: false,
          icon: <img title="Austrian Flag" alt="Austrian Flag" src={at} />,
          link: <a href="">test</a>,
          value: 'Austria',
        },
          {
            active: false,
            icon: <img title="German Flag" alt="German Flag" src={de} />,
            link: <a href="">test</a>,
            value: 'German',
          },
          {
            active: false,
            icon: <img title="Swiss Flag" alt="Swiss Flag" src={ch} />,
            value: 'Switzerland',
          },
          {
            active: true,
            icon: <img title="American Flag" alt="American Flag" src={us} />,
            link: <a href="">test</a>,
            value: 'United States',
          }]
        }
      />
    </Footer>
  </div>
);

render(
  App,
  document.getElementById('client-gear-playground'),
);
