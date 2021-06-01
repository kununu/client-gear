import {useEffect, useRef} from 'react';
import {tabbable} from 'tabbable';

const TAB_KEY_CODE = 9;
const TAB_KEY = 'Tab';

/**
 * @typedef {Object} Ref
 * @property {HTMLElement} [current]
 */

/**
 * Custom hook to trap focus in an element.
 *
 * @returns {Ref}
 */
function useTrapFocus () {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const focusableElements = tabbable(ref.current);
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event) => {
      const {key, keyCode, shiftKey} = event;

      if ((key === TAB_KEY || keyCode === TAB_KEY_CODE) && focusableElements.length > 0) {
        const currentFocusableElement = document.activeElement;

        if (!shiftKey && currentFocusableElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        } else if (shiftKey && currentFocusableElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return ref;
}

export default useTrapFocus;
