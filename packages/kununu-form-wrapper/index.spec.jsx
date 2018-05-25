import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {shallow, mount} from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import toJson from 'enzyme-to-json';
import {validationTypes} from '@kununu/kununu-utils/dist/kununu-helpers/formValidation';

import FormWrapper from './index';

describe('Returns current domain from a request object', () => {
  it('renders without crashing', () => {
    const MockComponent = () => (
      <input type="text" name="mock_input" />
    );

    const WrapperComponent = FormWrapper(MockComponent);

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

describe('possible interactions', () => {
  let WrapperComponent;
  let getInitialFieldsForUser;

  beforeEach(() => {
    localStorage.clear();
    class MockComponent extends Component {
      static propTypes = {
        updateStateFromLocalStorage: PropTypes.func,
        updateLocalStorageFromState: PropTypes.func,
        handleUserInput: PropTypes.func,
        handleSubmit: PropTypes.func,
        touchForm: PropTypes.func,
        resetFormFields: PropTypes.func,
        testProp: PropTypes.string,
      }
      componentDidMount () {
        this.props.updateStateFromLocalStorage('some_key');
      }

      componentWillUpdate () {
        this.props.updateLocalStorageFromState('some_key');
      }

      onSubmit = () => {
        this.props.resetFormFields();
      }

      render () {
        return (
          <form onSubmit={e => this.props.handleSubmit(e, this.onSubmit)}>
            <input
              type="text"
              name={this.props.testProp}
              onChange={this.props.handleUserInput}
            />
            <button onClick={() => this.props.touchForm(true)} />
          </form>
        );
      }
    }

    WrapperComponent = FormWrapper(MockComponent);

    getInitialFieldsForUser = () => ({
      answer: {
        value: '',
        error: false,
        touched: false,
        validations: [
          {
            type: validationTypes.isEmpty,
            message: 'value is way too short',
          },
        ],
      },
    });
  });


  it('validates input value when it confirms to validation condition', () => {
    const wrapper = shallow(<WrapperComponent getInitialFields={() => getInitialFieldsForUser()} />);
    const form = mount(wrapper.get(0));
    const input = form.find('input');

    input.simulate('change', {
      target: {
        value: 'dweldmd lwed wfwefewfwf',
        name: 'answer',
      },
    });

    expect(wrapper.state().fields.answer.error).toEqual(false);
  });

  it('throws correct error according to set validation conditions', () => {
    const wrapper = shallow(<WrapperComponent getInitialFields={() => getInitialFieldsForUser()} />);
    const form = mount(wrapper.get(0));
    const input = form.find('input');

    input.simulate('change', {
      target: {
        value: '',
        name: 'answer',
      },
    });

    expect(wrapper.state().fields.answer.error).toEqual('value is way too short');
  });

  it('will updates field values in localstorage on change', () => {
    const wrapper = shallow(<WrapperComponent getInitialFields={() => getInitialFieldsForUser()} />);
    const form = mount(wrapper.get(0));
    const input = form.find('input');
    const expectedInputValue = 'will be stored in localstorage';

    input.simulate('change', {
      target: {
        value: expectedInputValue,
        name: 'answer',
      },
    });

    // trigger componentWillUpdate
    form.setProps({testProp: 'some text here'});

    expect(localStorage.setItem).toHaveBeenLastCalledWith('some_key', JSON.stringify({fields: {answer: {value: expectedInputValue}}}));
  });

  it('will load field value from localstorage on mount', () => {
    const expectedInputValue = 'will be stored in localstorage';
    localStorage.setItem('some_key', JSON.stringify({fields: {answer: {value: expectedInputValue}}}));

    const wrapper = shallow(<WrapperComponent getInitialFields={() => getInitialFieldsForUser()} />);
    // still mount form, in order to trigger componentDidMount
    const form = mount(wrapper.get(0)); // eslint-disable-line no-unused-vars

    expect(wrapper.state().fields.answer.value).toEqual(expectedInputValue);
  });

  it('will touch fields when triggered', () => {
    const wrapper = shallow(<WrapperComponent getInitialFields={() => getInitialFieldsForUser()} />);
    const form = mount(wrapper.get(0));
    const input = form.find('input');
    const button = form.find('button');

    input.simulate('change', {
      target: {
        value: '123',
        name: 'answer',
      },
    });

    button.simulate('click');

    expect(wrapper.state().fields.answer.touched).toEqual(true);
  });

  it('will fire a callback defined in child component on submit and reset field values', () => {
    const wrapper = mount(<WrapperComponent getInitialFields={() => getInitialFieldsForUser()} />);
    const formElement = wrapper.find('form');
    const input = wrapper.find('input');

    input.simulate('change', {
      target: {
        value: 'some input text',
        name: 'answer',
      },
    });

    formElement.simulate('submit');

    expect(wrapper.state().fields.answer.value.length).toEqual(0);
  });

  it('will give you back props based on provided ID', () => {
    const wrapper = shallow(<WrapperComponent getInitialFields={() => getInitialFieldsForUser()} />);
    const form = mount(wrapper.get(0)); // eslint-disable-line
    const input = form.find('input');
    const expectedOutput = 'some input text';

    input.simulate('change', {
      target: {
        name: 'answer',
        value: expectedOutput,
      },
    });

    const propsFromWrapper = wrapper.props().getFormFieldProps('answer');
    expect(propsFromWrapper.id).toEqual('answer');
    expect(propsFromWrapper.input.value).toEqual('some input text');
  });
});

