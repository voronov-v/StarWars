/**
 * @param {string[]} arr
 */

const tasks = (arr) => {
  return arr.join(' && ');
};

module.exports = {
  hooks: {
    'pre-commit': tasks(['HUSKY_DEBUG=1 lint-staged', 'HUSKY_DEBUG=1 jest']),
  },
};
