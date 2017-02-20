import React from 'react';
import renderer from 'react-test-renderer';

import KununuLogo from '../packages/kununu-logo';

test('Renders Logo without crashing', () => {
  const component = renderer.create(
    <KununuLogo />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

