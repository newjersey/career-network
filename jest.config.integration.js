// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/__tests__/Firebase/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '<rootDir>/__tests__/support/helpers.js'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/support/',
  ],
};
