module.exports = {
  env: {
    es6: true,
    node: true
  },
  parser: "babel-eslint",
  plugins: ["prettier"],
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "no-console": 0,
    "no-param-reassign": [2, { props: false }],
    "prefer-destructuring": 0,
    "arrow-body-style": 0,
    "comma-dangle": 0,
    "no-useless-catch": 0,
    "consistent-return": 0
  }
};
