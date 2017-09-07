import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import {Header, HeaderNav, HeaderNavItem} from '../kununu-header';
import Footer from '../kununu-footer';

// if you want to test the distribution, just uncomment the lines below
/* import Header from '../kununu-header/dist/Header';
import HeaderNav from '../kununu-header/dist/HeaderNav';
import HeaderNavItem from '../kununu-header/dist/HeaderNavItem';
import Footer from '../kununu-footer/dist';*/

const at = require('./img/at.gif');
const ch = require('./img/ch.gif');
const de = require('./img/de.gif');
const us = require('./img/us.gif');


const infoText = (
  <span>Auf kununu wurden bereits <b className="text-green">1.475.000</b> authentische Erfahrungsberichte über Gehalt, Betriebsklima und Bewerbungsprozesse zu <b className="text-green">297.000</b> Unternehmen abgegeben</span>
);

const App = ({location: {pathname}, params: {country, menuItem}}) => (
  <div className="appContainer">
    <Header
      isLoading
      title="Volle Transparenz am Arbeitsmarkt"
      logoLink={<a href="">hi</a>}
      responsive={false}
    >
      <HeaderNav>
        <HeaderNavItem>
          <a href="">
            <span className="hidden-xs">
              <i className="fa fa-search hidden-xs" aria-hidden="true" />
              &nbsp; Suchen
            </span>
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
          <a href="/" className="btn btn-dd-sm btn-primary">
            Firma bewerten
          </a>
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
      simpleMobile
      items={{
        countrySwitcher: [
          {
            active: true,
            icon: <img title="Austrian Flag" alt="Austrian Flag" src={at} />,
            link: <Link to={{pathname: `/at${menuItem ? `/${menuItem}` : ''}`}}>test</Link>,
            value: 'Austria',
          },
          {
            active: false,
            icon: <img title="German Flag" alt="German Flag" src={de} />,
            link: <Link to={{pathname: `/de${menuItem ? `/${menuItem}` : ''}`}}>test</Link>,
            value: 'German',
          },
          {
            active: false,
            icon: <img title="Swiss Flag" alt="Swiss Flag" src={ch} />,
            link: <Link to={{pathname: `/ch${menuItem ? `/${menuItem}` : ''}`}}>test</Link>,
            value: 'Switzerland',
          },
          {
            active: false,
            icon: <img title="American Flag" alt="American Flag" src={us} />,
            link: <Link to={{pathname: `/us${menuItem ? `/${menuItem}` : ''}`}}>test</Link>,
            value: 'United States',
          },
        ],
        navs: {
          cols: [
            {
              items: [
                {
                  link: <Link to={{pathname: `${country ? `/${country}` : ''}/a`}}>test</Link>,
                  value: 'Was ist kununu',
                },
                {
                  link: <Link to={{pathname: `${country ? `/${country}` : ''}/b`}}>test</Link>,
                  value: 'Karriere',
                },
                {
                  link: <Link to={{pathname: `${country ? `/${country}` : ''}/c`}}>test</Link>,
                  value: 'Presse',
                },
                {
                  link: <Link to={{pathname: `${country ? `/${country}` : ''}/d`}}>test</Link>,
                  value: 'News',
                }],
              title: 'Über kununu',
            },
            {
              items: [
                {
                  link: <Link to={{pathname: `${country ? `/${country}` : ''}/e`}}>test</Link>,
                  value: 'Gehaltsrechner',
                },
                {
                  link: <Link to={{pathname: `${country ? `/${country}` : ''}/f`}}>test</Link>,
                  value: 'Hilfe & Kontakt',
                },
              ],
              title: 'Für Mitarbeiter',
            },
            {
              items: [
                {
                  link: <Link to={{pathname: `${country ? `/${country}` : ''}/g`}}>test</Link>,
                  value: 'Unsere Produkte',
                },
                {
                  link: <Link to={{pathname: `${country ? `/${country}` : ''}/h`}}>test</Link>,
                  value: 'FAQ',
                },
                {
                  link: <Link to={{pathname: `${country ? `/${country}` : ''}/i`}}>test</Link>,
                  value: 'Kontakt',
                },
                {
                  link: <Link to={{pathname: `${country ? `/${country}` : ''}/j`}}>test</Link>,
                  value: 'Toolkit',
                },
                {
                  link: <Link to={{pathname: `${country ? `/${country}` : ''}/k`}}>test</Link>,
                  value: 'Toolkit 2',
                },
              ],
              title: 'Für Unternehmen',
            },
          ],
          rows: [
            {
              items: [
                {
                  link: <Link to={{pathname: `${country ? `/${country}` : ''}/k`}}>test</Link>,
                  value: 'AGB',
                },
                {
                  link: <Link to={{pathname: `${country ? `/${country}` : ''}/l`}}>test</Link>,
                  value: 'Impressum',
                },
                {
                  link: <Link to={{pathname: `${country ? `/${country}` : ''}/m`}}>test</Link>,
                  value: 'Datenschutz',
                },
                {
                  link: <Link to={{pathname: `${country ? `/${country}` : ''}/n`}}>test</Link>,
                  value: 'Disclaimer',
                },
                {
                  link: <Link to={{pathname: `${country ? `/${country}` : ''}/o`}}>test</Link>,
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
  params: PropTypes.shape({
    country: PropTypes.string,
    menuItem: PropTypes.string,
  }),
};
export default App;
