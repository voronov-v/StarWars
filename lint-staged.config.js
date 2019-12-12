module.exports = {
  '*': ['prettier'],
  '*.{js,jsx}': ['eslint', 'git add'],
  '*.{ts,tsx}': ['tslint', 'git add'],
};
