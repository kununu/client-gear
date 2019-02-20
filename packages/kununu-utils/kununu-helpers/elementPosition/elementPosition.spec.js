import React from 'react';
import {render} from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies

import elementPosition from './index';

describe('Returns the correct element Y position of an element', () => {
  it('Returns the correct value', () => {
    const element = render(
      <div>Test</div>,
    );

    element.getBoundingClientRect = () => ({
      width: 50,
      height: 50,
      top: 10,
      left: 10,
      right: 10,
      bottom: 10,
    });

    expect(elementPosition(element)).toEqual(10);
  });
});
