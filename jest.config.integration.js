// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/__tests__/Firebase/'],
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.integration.js',
    '<rootDir>/__tests__/support/helpers.js',
    '<rootDir>/__tests__/support/helpers.integration.js',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/support/',
  ],
};
