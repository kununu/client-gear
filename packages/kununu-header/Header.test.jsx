import React from 'react';
import renderer from 'react-test-renderer'; // eslint-disable-line import/no-extraneous-dependencies

import {Header, HeaderNav, HeaderNavItem} from '.';

test('Renders Logo without crashing', () => {
  const component = renderer.create(
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
    </Header>,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
