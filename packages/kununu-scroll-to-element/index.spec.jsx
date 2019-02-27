import React from 'react';
import {render} from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies

import ScrollToElement from './index';


const Test = () => (<span>test</span>);

test('Renders ScrollToElement without crashing', () => {
  const component = render(
    <ScrollToElement
      className="class"
      duration={150}
      key={1}
      mobileOnly={false}
      tagName="article"
    >
      <Test />
    </ScrollToElement>,
  );

  expect(component).toMatchSnapshot();
});
