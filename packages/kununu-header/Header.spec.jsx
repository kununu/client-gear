import React from 'react';
import {render} from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies

import {Header, HeaderNav, HeaderNavItem} from './index';


test('Renders Header without crashing', () => {
  const component = render(
    <Header
      title="Volle Transparenz am Arbeitsmarkt"
      logoLink={<a href="/test">test</a>}
    >
      <HeaderNav>
        <HeaderNavItem>
          <a href="/test">
            <span className="hidden-xs">
              <i
                className="fa fa-search hidden-xs"
                aria-hidden="true"
              />
              &nbsp; Suchen
            </span>
            <i
              className="fa fa-search visible-xs"
              aria-hidden="true"
            />
          </a>
        </HeaderNavItem>
        <HeaderNavItem>
          <a
            className=""
            href="/"
          >
            <span className="hidden-xs">Mein kununu </span>
            <i className="fa fa-user visible-xs" />
          </a>
        </HeaderNavItem>
        <HeaderNavItem>
          <a
            href="/"
            className="btn btn-dd-sm btn-primary"
          >
            Firma bewerten
          </a>
        </HeaderNavItem>
      </HeaderNav>
    </Header>,
  );

  expect(component).toMatchSnapshot();
});
