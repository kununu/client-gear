import React from 'react';
import renderer from 'react-test-renderer'; // eslint-disable-line import/no-extraneous-dependencies

import KununuLogo from './index';

test('Renders Logo without crashing', () => {
  const component = renderer.create(
    <KununuLogo
      title="test"
    />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders Logo with link', () => {
  const component = renderer.create(
    <KununuLogo
      title="test"
      link={<a href="/">Test</a>}
    />,
  );

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
