// Temporary hack to suppress error
// https://github.com/facebook/jest/issues/4545


const raf = global.requestAnimationFrame = (cb) => {
  setTimeout(cb, 0);
};

export default raf;
