module.exports = {
  // ...
  transform: {
    "\\.[jt]sx?$": "babel-jest",
      "^.+\\.svg$" : "<rootDir>/svgTransform.js",
  }
}