// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  plugins: ["vue"],
  globals: {
    '$': false,
    'jquery': false
  },
  rules: {
    "max-len": [
      "warn",
      {
        code: 250
      }
    ],
    "no-unused-vars": "off",
    "no-console": "off",
    "prettier/prettier": [
      "warn",
      {
        singleQuote: true,
        trailingComma: "es5",
        bracketSpacing: true,
        jsxBracketSameLine: true,
        printWidth: 160
      }
    ]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
