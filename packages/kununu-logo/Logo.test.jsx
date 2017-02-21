import React from 'react';
import renderer from 'react-test-renderer'; // eslint-disable-line import/no-extraneous-dependencies

import KununuLogo from '.';

test('Renders Logo without crashing', () => {
  const component = renderer.create(<KununuLogo />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
