module.exports = {
  coverageThreshold: {
    './src/*.js': {
      lines: 80,
    },
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  }
}