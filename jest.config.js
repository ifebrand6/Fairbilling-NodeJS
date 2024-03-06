// jest.config.js
module.exports = {
  testEnvironment: 'node', // Use Node.js environment for testing
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  // Other configuration options...
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Use Babel to transform ES6 code
  },
};
