module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  moduleFileExtensions: ["js"],
  testEnvironment: "node",
  coverageThreshold: {
    global: {
      lines: 50
    }
  }
};
