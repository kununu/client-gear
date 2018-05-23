import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line
import toJson from 'enzyme-to-json';
import {validationTypes} from '@kununu/kununu-utils/dist/kununu-helpers/formValidation';

import FormWrapper from './index';

describe('Returns current domain from a request object', () => {
  let WrapperComponent;

  beforeEach(() => {
    const MockComponent = () => (
      <input type="text" name="mock_input" />
    );

    WrapperComponent = FormWrapper(MockComponent);
  });

  it('renders without crashing', () => {
    const getInitialFieldsForUser = () => ({
      answer: {
        value: '',
        error: false,
        touched: false,
        validations: [
          {
            type: validationTypes.isEmpty,
            message: 'COMPANY_PROFILE_QA_ANSWER_AS_EMPLOYER',
          },
        ],
      },
    });

    const wrapper = shallow(<WrapperComponent getInitialFields={() => getInitialFieldsForUser()} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
