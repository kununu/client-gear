const isBrowser = typeof window !== 'undefined';

export default function getElementPositionY (element, offset = 0) {
  if (!isBrowser) return 0;
  const box = element.getBoundingClientRect();
  const {body} = document;
  const docElem = document.documentElement;
  const scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
  const clientTop = docElem.clientTop || body.clientTop || 0;

  return (box.top + scrollTop) - clientTop - offset;
}
