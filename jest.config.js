module.exports = {
  coverageThreshold: {
    global: {
      lines: 50,
    },
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx"],
  testEnvironment: "node",
};
