import React from 'react';
import {render} from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies

import KununuOverlay from './index';

test('Renders overlay without crashing', () => {
  const component = render(
    <KununuOverlay />
  );

  expect(component).toMatchSnapshot();
});
