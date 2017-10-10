import Scroll from 'react-scroll';

import getElementPositionY from './elementPosition';

const scroll = Scroll.animateScroll;

/**
 * Helps calculating the offset of the header,
 * that is usually needed in scrollTo functions
 * @param {number} add additional offset, that can be supplied (extra whitespace)
 */
export function getHeaderOffset (add = 0) {
  const header = document.querySelector('[role=banner]');
  return header.offsetHeight + add;
}

export function getWindowHeight () {
  return window.innerHeight || document.documentElement.clientHeight;
}

export function getWindowWidth () {
  return window.innerWidth || document.documentElement.clientWidth;
}

export function alreadyInView (node) {
  const rect = node.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= getWindowHeight() &&
    rect.right <= getWindowWidth()
  );
}

export function scrollToTop (timeout = 0, duration = 1500) {
  setTimeout(() => {
    scroll.scrollToTop({duration});
  }, timeout);
}

/**
 * recursively searches for the container of the error,
 * that has the className formGroup
 * @param  {DOMElement}          element
 * @return {DOMElement || null}
 */
const findParentFormGroup = (element) => {
  const parent = element.parentNode;
  if (!parent.className) return null; // Reached highest parentNode
  if (parent.className.includes('formGroup')) {
    return parent;
  }

  return findParentFormGroup(parent);
};

/**
 * find the controlLabel that belongs to this formGroup (or labelContainer)
 * @param  {DOMElement}          element
 * @return {DOMElement || null}
 */
const findControlLabel = element =>
  element.querySelector('[class*="index__controlLabel__"]:not([class*="index__hidden"])') ||
  element.querySelector('[class*="index__labelContainer__"]:not([class*="index__hidden"])') || element;

/**
 * searches for the first error on the page and scrolls to the label, that
 * belongs to this error
 */
export const scrollToFirstError = () => {
  // Wait for first tick after submit, where hopefully all state changes have
  // been applied
  setTimeout(() => {
    const firstError = document.querySelector('[class*="index__error"]');
    const parent = findParentFormGroup(firstError);

    // Either scroll to label or error itself, if there is no label
    const scrollToElem = parent ? findControlLabel(parent) : firstError;

    // Banner is fixed, so we need to offset by banner and a little bit of extra margin (15)
    scroll.scrollTo(getElementPositionY(scrollToElem) - getHeaderOffset(15), {
      duration: 200,
      smooth: true,
    });
  }, 0);
};
