/**
 * Returns the domain in a string that could contain multiple domains
 *
 * @param {string} domain
 */
module.exports = (domain) => {
  if (domain.includes(', ')) return domain.split(', ')[0];

  return domain;
};
