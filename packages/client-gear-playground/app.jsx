import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Tabs from 'nukleus/dist/components/Tabs';
// if you want to test the distribution, just uncomment the lines below
// import Footer from '@kununu/kununu-footer';
// import FormWrapper from '@kununu/kununu-form-wrapper';
// import IconSearch from '@kununu/kununu-icons/dist/Search';
// import IconUser from '@kununu/kununu-icons/dist/User';
// import {Header, HeaderNav, HeaderNavItem} from '@kununu/kununu-header';
// import {validationTypes} from '@kununu/kununu-utils/kununu-helpers/formValidation';

import Footer from '../kununu-footer/index';
import FormWrapper from '../kununu-form-wrapper/index';
import IconSearch from '../kununu-icons/Search';
import IconUser from '../kununu-icons/User';
import {Header, HeaderNav, HeaderNavItem} from '../kununu-header/index';
import {validationTypes} from '../kununu-utils/kununu-helpers/formValidation';

import styles from './index.scss';
import Home from './home';
import Icons from './icons';
import Form from './form';

const at = require('./img/at.gif');
const ch = require('./img/ch.gif');
const de = require('./img/de.gif');
const us = require('./img/us.gif');

const infoText = (
  <span>
    Auf kununu wurden bereits
    <b className="text-green">3,168,957</b>
    {' '}
    authentische Erfahrungsberichte über Gehalt, Betriebsklima und Bewerbungsprozesse zu
    <b className="text-green">854,882</b>
    {' '}
    Unternehmen abgegeben.
  </span>
);

const FormWrapperComponent = FormWrapper(Form);

const defaultField = {
  value: '',
  error: false,
  touched: false,
  validations: [],
};

const getHeader = () => (
  <Header
    logoLink={<a href="/">hi</a>}
    responsive={false}
    title="Workplace insights that matter"
  >
    <HeaderNav>
      <HeaderNavItem>
        <a href="/">
          <span className={styles.headerIcon}>
            <IconSearch ariaHidden />
          </span>
          <span className="hidden-xs">
            Suchen
          </span>
        </a>
      </HeaderNavItem>
      <HeaderNavItem>
        <a
          className=""
          href="/"
        >
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
          href="/"
          className="btn btn-dd-sm btn-primary"
        >
        Arbeitgeber bewerten
        </a>
      </HeaderNavItem>
    </HeaderNav>
  </Header>
);

const getFooterCountrySwitcher = (country, menuItem) => (
  [
    {
      active: country === 'at',
      icon: <img
        title="Austrian Flag"
        alt="Austrian Flag"
        src={at}
      />,
      link: <Link to={{pathname: `/at${menuItem ? `/${menuItem}` : ''}`}}>test</Link>,
      value: 'Austria',
    },
    {
      active: country === 'de',
      icon: <img
        title="German Flag"
        alt="German Flag"
        src={de}
      />,
      link: <Link to={{pathname: `/de${menuItem ? `/${menuItem}` : ''}`}}>test</Link>,
      value: 'German',
    },
    {
      active: country === 'ch',
      icon: <img
        title="Swiss Flag"
        alt="Swiss Flag"
        src={ch}
      />,
      link: <Link to={{pathname: `/ch${menuItem ? `/${menuItem}` : ''}`}}>test</Link>,
      value: 'Switzerland',
    },
    {
      active: country === 'us',
      icon: <img
        title="American Flag"
        alt="American Flag"
        src={us}
      />,
      link: <Link to={{pathname: `/us${menuItem ? `/${menuItem}` : ''}`}}>test</Link>,
      value: 'United States',
    },
  ]
);

const getFooterCols = country => (
  [
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
  ]
);

const getFooterRows = country => (
  [
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
  ]
);
const getFooter = (pathname, country, menuItem) => (
  <Footer
    infoText={infoText}
    pathname={pathname}
    tuv
    simpleMobile={false}
    items={{
      countrySwitcher: getFooterCountrySwitcher(country, menuItem),
      navs: {
        cols: getFooterCols(country),
        rows: getFooterRows(country),
      },
    }}
  />
);

const App = ({location: {pathname, hash}, match: {params: {country, menuItem}}}) => (
  <div className="appContainer">
    {getHeader()}
    <main role="main">
      <div className="container-fluid">
        <div className={styles.menu}>
          <Tabs
            items={[
              <Link to={{pathname: `/${country}`}}>Home</Link>,
              <Link to={{pathname: `/${country}`, hash: '#icons'}}>Icons</Link>,
              <Link to={{pathname: `/${country}`, hash: '#form-wrapper'}}>Form Wrapper</Link>,
            ]}
            pathname={`/${country}`}
            hash={hash}
          />
          {!hash && <Home />}
          {hash === '#icons' && <Icons />}
          {hash === '#form-wrapper' && (
            <FormWrapperComponent getInitialFields={() => ({
              text_name: defaultField,
              select_name: {
                ...defaultField,
                value: 'b',
              },
              minLengthValidation: {
                ...defaultField,
                validations: [
                  {
                    type: validationTypes.minLength,
                    minLength: 2,
                    message: 'min length',
                  },
                ],
              },
            })}
            />
          )}
        </div>
      </div>
    </main>
    {getFooter(pathname, country, menuItem)}
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    hash: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      country: PropTypes.string,
      menuItem: PropTypes.string,
    }),
  }).isRequired,
};

export default App;
