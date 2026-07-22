module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/integration/**/*.test.js', '**/unit/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/integration/setup.js'],
  testTimeout: 30000,
};
