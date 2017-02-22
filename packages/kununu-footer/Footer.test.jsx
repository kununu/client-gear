import React from 'react';
import renderer from 'react-test-renderer'; // eslint-disable-line import/no-extraneous-dependencies
import {Link} from 'react-router'; // eslint-disable-line import/no-extraneous-dependencies

import {Footer} from '../kununu-footer';

jest.mock('nukleus');

const infoText = (
  <span>Auf kununu wurden bereits <b className="text-green">1.475.000</b> authentische Erfahrungsberichte über Gehalt, Betriebsklima und Bewerbungsprozesse zu <b className="text-green">297.000</b> Unternehmen abgegeben</span>
);

const footer = (
  <Footer
    infoText={infoText}
    pathname="test"
    tuv
    items={{
      countrySwitcher: [
        {
          icon: <img title="Austrian Flag" alt="Austrian Flag" src="" />,
          link: <Link to={{pathname: '/'}}>test</Link>,
          value: 'Austria',
        },
        {
          icon: <img title="German Flag" alt="German Flag" src="" />,
          link: <Link to={{pathname: '/de'}}>test</Link>,
          value: 'German',
        },
        {
          icon: <img title="Swiss Flag" alt="Swiss Flag" src="" />,
          link: <Link to={{pathname: '/ch'}}>test</Link>,
          value: 'Switzerland',
        },
        {
          icon: <img title="American Flag" alt="American Flag" src="" />,
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
);

test('Renders Footer without crashing', () => {
  const component = renderer.create(footer);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

