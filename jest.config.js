module.exports = {
  bail: 1,
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  coverageProvider: 'v8',
  transform: {
    '\\.(js|jsx|ts|tsx)$': '@sucrase/jest-plugin'
  }
}
