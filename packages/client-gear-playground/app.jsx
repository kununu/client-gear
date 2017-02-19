import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import {Header, HeaderNav, HeaderNavItem} from '../kununu-header';
import {Footer} from '../kununu-footer';

const at = require('./img/at.gif');
const ch = require('./img/ch.gif');
const de = require('./img/de.gif');
const us = require('./img/us.gif');


const infoText = (
  <span>Auf kununu wurden bereits <b className="text-green">1.475.000</b> authentische Erfahrungsberichte über Gehalt, Betriebsklima und Bewerbungsprozesse zu <b className="text-green">297.000</b> Unternehmen abgegeben</span>
);

const App = ({location: {pathname}}) => (
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
      pathname={pathname}
      tuv
      items={{
        countrySwitcher: [
          {
            icon: <img title="Austrian Flag" alt="Austrian Flag" src={at} />,
            link: <Link to={{pathname: '/'}}>test</Link>,
            value: 'Austria',
          },
          {
            icon: <img title="German Flag" alt="German Flag" src={de} />,
            link: <Link to={{pathname: '/de'}}>test</Link>,
            value: 'German',
          },
          {
            icon: <img title="Swiss Flag" alt="Swiss Flag" src={ch} />,
            link: <Link to={{pathname: '/ch'}}>test</Link>,
            value: 'Switzerland',
          },
          {
            icon: <img title="American Flag" alt="American Flag" src={us} />,
            link: <Link to={{pathname: '/us'}}>test</Link>,
            value: 'United States',
          },
        ],
        navs: {
          cols: [
            {
              items: [
                {
                  link: <Link to="/a">test</Link>,
                  value: 'Was ist kununu',
                },
                {
                  link: <Link to="/b">test</Link>,
                  value: 'Karriere',
                },
                {
                  link: <Link to="/c">test</Link>,
                  value: 'Presse',
                },
                {
                  link: <Link to="/d">test</Link>,
                  value: 'News',
                }],
              title: 'Über kununu',
            },
            {
              items: [
                {
                  link: <Link to="/e">test</Link>,
                  value: 'Gehaltsrechner',
                },
                {
                  link: <Link to="/f">test</Link>,
                  value: 'Hilfe & Kontakt',
                },
              ],
              title: 'Für Mitarbeiter',
            },
            {
              items: [
                {
                  link: <Link to="/g">test</Link>,
                  value: 'Unsere Produkte',
                },
                {
                  link: <Link to="/h">test</Link>,
                  value: 'FAQ',
                },
                {
                  link: <Link to="/i">test</Link>,
                  value: 'Kontakt',
                },
                {
                  link: <Link to="/j">test</Link>,
                  value: 'Toolkit',
                },
              ],
              title: 'Für Unternehmen',
            },
          ],
          rows: [
            {
              items: [
                {
                  link: <Link to="/k">test</Link>,
                  value: 'AGB',
                },
                {
                  link: <Link to="/l">test</Link>,
                  value: 'Impressum',
                },
                {
                  link: <Link to="/m">test</Link>,
                  value: 'Datenschutz',
                },
                {
                  link: <Link to="/n">test</Link>,
                  value: 'Disclaimer',
                },
                {
                  link: <Link to="/o">test</Link>,
                  value: 'Sitemap',
                },
              ],
            },
          ],
        },
      }}
    />

  </div>
);

App.propTypes = {
  location: PropTypes.object.isRequired, // eslint-disable-line
};
export default App;
