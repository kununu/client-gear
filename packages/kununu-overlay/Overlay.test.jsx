import React from 'react';
import renderer from 'react-test-renderer'; // eslint-disable-line import/no-extraneous-dependencies

import KununuOverlay from './index';

test('Renders overlay without crashing', () => {
  const component = renderer.create(
    <KununuOverlay />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
