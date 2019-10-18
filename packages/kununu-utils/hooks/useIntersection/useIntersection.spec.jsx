import React from 'react';
import {render, cleanup} from '@testing-library/react';
import {act} from 'react-dom/test-utils';
import PropTypes from 'prop-types';

import useIntersection from '.';

const observeSpy = jest.fn();
const unobserveSpy = jest.fn();

global.IntersectionObserver = jest.fn(() => ({
  observe: observeSpy,
  unobserve: unobserveSpy,
}));

const HookComponent = ({options}) => {
  const [ref, isIntersecting] = useIntersection(options);

  return (
    <div
      id="wrapper"
      ref={ref}
    >
      {isIntersecting.toString()}
    </div>
  );
};

HookComponent.propTypes = {
  options: PropTypes.shape({
    triggerOnce: PropTypes.bool,
  }),
};

HookComponent.defaultProps = {
  options: {},
};

describe('useIntersection custom hook', () => {
  beforeEach(() => {
    global.IntersectionObserver.mockClear();
    cleanup();
  });

  it('should create a hook', () => {
    const {container} = render(<HookComponent />);

    expect(observeSpy).toHaveBeenCalledWith(container.querySelector('#wrapper'));
  });

  it('should unmount the hook', () => {
    const {container, unmount} = render(<HookComponent />);
    const wrapper = container.querySelector('#wrapper');

    unmount();
    expect(unobserveSpy).toHaveBeenCalledWith(wrapper);
  });

  it('should trigger isIntersecting', () => {
    const {getByText} = render(<HookComponent options={{}} />);
    const observerCallback = global.IntersectionObserver.mock.calls[0][0];

    act(() => {
      observerCallback([{isIntersecting: true}]);
    });
    getByText('true');
    act(() => {
      observerCallback([{isIntersecting: false}]);
    });
    getByText('false');
  });

  it('should respect triggerOnce option', () => {
    const {container, getByText} = render(<HookComponent options={{triggerOnce: true}} />);
    const wrapper = container.querySelector('#wrapper');
    const observerCallback = global.IntersectionObserver.mock.calls[0][0];

    act(() => {
      observerCallback([{isIntersecting: true}]);
    });
    getByText('true');
    expect(unobserveSpy).toHaveBeenCalledWith(wrapper);
  });
});
