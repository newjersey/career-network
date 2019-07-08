// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  coverageDirectory: 'coverage',
  setupFiles: ['jest-date-mock'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '<rootDir>/__tests__/support/helpers.js'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/support',
  ],
};
