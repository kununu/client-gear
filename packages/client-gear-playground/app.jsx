import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

import {Header, HeaderNav, HeaderNavItem} from '../kununu-header/index';
import Footer from '../kununu-footer/index';
import Overlay from '../kununu-overlay/index';
import Logo from '../kununu-logo/index';
import IconSearch from '../kununu-icons/Search';
import IconUser from '../kununu-icons/User';

// if you want to test the distribution, just uncomment the lines below
// import {Header, HeaderNav, HeaderNavItem} from '../kununu-header/dist';
// import Footer from '../kununu-footer/dist';
// import Overlay from '../kununu-overlay/dist';
// import Logo from '../kununu-logo/dist';
// import IconSearch from '../kununu-icons/dist/Search';
// import IconUser from '../kununu-icons/dist/User';

const at = require('./img/at.gif');
const ch = require('./img/ch.gif');
const de = require('./img/de.gif');
const us = require('./img/us.gif');

import styles from './index.scss';

const infoText = (
  <span>Auf kununu wurden bereits <b className="text-green">3,168,957</b> authentische Erfahrungsberichte über Gehalt, Betriebsklima und Bewerbungsprozesse zu <b className="text-green">854,882</b> Unternehmen abgegeben.</span>
);

const country = 'at';
const menuItem = undefined;

// const App = ({location: {pathname}, params: {country, menuItem}}) => (
const App = ({location: {pathname}}) => (
  <div className="appContainer">
    <Header
      logoLink={<a href="">hi</a>}
      responsive={false}
      title="Workplace insights that matter"
    >
      <HeaderNav>
        <HeaderNavItem>
          <a href="">
            <span className={styles.headerIcon}>
              <IconSearch ariaHidden />
            </span>
            <span className="hidden-xs">
              Suchen
            </span>
          </a>
        </HeaderNavItem>
        <HeaderNavItem>
          <a className="" href="/">
            <span className="hidden-xs">
              Mein kununu
            </span>
            <span className={`${styles.headerIcon} visible-xs`}>
              <IconUser />
            </span>
          </a>
        </HeaderNavItem>
        <HeaderNavItem>
        <a
          href=""
          className="btn btn-dd-sm btn-primary"
        >
          Arbeitgeber bewerten
        </a>
        </HeaderNavItem>
      </HeaderNav>
    </Header>
    <main role="main">
      <Overlay />
      <div className="container-fluid">
        <div style={{backgroundColor: '#fff', padding: '10px 20px'}}>
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
      </div>
    </main>
    <Footer
      infoText={infoText}
      pathname={pathname}
      tuv
      simpleMobile={false}
      items={{
        countrySwitcher: [
          {
            active: country === 'at',
            icon: <img title="Austrian Flag" alt="Austrian Flag" src={at} />,
            link: <Link to={{pathname: `/at${menuItem ? `/${menuItem}` : ''}`}}>test</Link>,
            value: 'Austria',
          },
          {
            active: country === 'de',
            icon: <img title="German Flag" alt="German Flag" src={de} />,
            link: <Link to={{pathname: `/de${menuItem ? `/${menuItem}` : ''}`}}>test</Link>,
            value: 'German',
          },
          {
            active: country === 'ch',
            icon: <img title="Swiss Flag" alt="Swiss Flag" src={ch} />,
            link: <Link to={{pathname: `/ch${menuItem ? `/${menuItem}` : ''}`}}>test</Link>,
            value: 'Switzerland',
          },
          {
            active: country === 'us',
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
