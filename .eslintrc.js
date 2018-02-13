module.exports = {
  extends: 'kununu',
  rules: {
    "import/no-extraneous-dependencies": ["error", {"devDependencies": ["**/*.spec.jsx", "**/*.spec.js"]}]
  }
};
