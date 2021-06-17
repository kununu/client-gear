import React from 'react';
import {render, fireEvent} from '@testing-library/react';

import useTrapFocus from '..';

function TrapFocusComponent () {
  const ref = useTrapFocus();

  return (
    <div ref={ref}>
      <button type="button">First Button</button>
      <p>Text</p>
      <button type="button">Middle Button</button>
      <p>Text</p>
      <button type="button">Last Button</button>
    </div>
  );
}

describe('useTrapFocus', () => {
  it('should add an event on the document', () => {
    const addEventListenerReference = document.addEventListener;

    document.addEventListener = jest.fn();

    render(<TrapFocusComponent />);

    expect(document.addEventListener).toHaveBeenCalledTimes(1);
    expect(document.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));

    document.addEventListener = addEventListenerReference;
  });

  it('should remove the event on component unmount', () => {
    const removeEventListenerReference = document.removeEventListener;

    document.removeEventListener = jest.fn();

    const {unmount} = render(<TrapFocusComponent />);

    unmount();

    expect(document.removeEventListener).toHaveBeenCalledTimes(1);
    expect(document.removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));

    document.removeEventListener = removeEventListenerReference;
  });

  it('should return the focus to the first element', () => {
    const {getByText} = render(<TrapFocusComponent />);

    const firstButton = getByText('First Button');
    const lastButton = getByText('Last Button');

    lastButton.focus();
    fireEvent.keyDown(lastButton, {key: 'Tab'});

    expect(document.activeElement).toBe(firstButton);
  });

  it('should return the focus to the last element', () => {
    const {getByText} = render(<TrapFocusComponent />);

    const firstButton = getByText('First Button');
    const lastButton = getByText('Last Button');

    firstButton.focus();
    fireEvent.keyDown(firstButton, {key: 'Tab', shiftKey: true});

    expect(document.activeElement).toBe(lastButton);
  });
});
