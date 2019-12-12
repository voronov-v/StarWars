module.exports = {
  cacheDirectory: '.jest/cache',
  collectCoverage: true,
  globals: {
    __DEV__: true,
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'ts', 'tsx'],
  notify: true,
  notifyMode: 'always',
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: ['jest-extended'],
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  verbose: true,
};
