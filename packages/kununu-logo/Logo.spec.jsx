import React from 'react';
import {render} from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies

import KununuLogo from './index';

test('Renders Logo without crashing', () => {
  const component = render(
    <KununuLogo
      title="test"
    />,
  );

  expect(component).toMatchSnapshot();
});

test('Renders Logo with link', () => {
  const component = render(
    <KununuLogo
      title="test"
      link={<a href="/">Test</a>}
    />,
  );

  expect(component).toMatchSnapshot();
});
