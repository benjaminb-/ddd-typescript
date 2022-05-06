module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  rootDir: "src",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  coverageDirectory: "../coverage",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
