module.exports = {
  // ...
  transform: {
    "\\.[jt]sx?$": "babel-jest",
      "^.+\\.svg$" : "./svgTransform.js",
  }
}