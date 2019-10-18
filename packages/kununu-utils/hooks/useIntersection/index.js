import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

/**
 * Custom hook for using IntersectionObserver
 *
 * @param {Object}     options             IntersectionObserver options
 * @param {DOMElement} options.root        Defaults to browser viewport
 * @param {string}     options.rootMargin  Margin around the root
 * @param {number}     options.threshold   Threshold at which returned intersection state switches from false to true
 * @param {boolean}    options.triggerOnce If true the intersection will trigger only once
 * @return {Array}                         Array with 2 elements. The first being a ref that needs to be assigned to the node being observed.
 *                                         The second element is a boolean for the state of the intersection.
 */
const useIntersection = (options) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const observer = useRef();
  const ref = useRef();

  const setRef = useCallback((node) => {
    ref.current = node;
  }, []);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && options.triggerOnce) {
          observer.current.unobserve(ref.current);
        }
      },
      options,
    );

    if (ref.current) {
      observer.current.observe(ref.current);
    }

    return () => {
      observer.current.unobserve(ref.current);
    };
  }, []);
  return [setRef, isIntersecting];
};

export default useIntersection;
