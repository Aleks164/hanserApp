// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react-hooks"],
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", path.resolve(__dirname, "src")]],
      },
    },
  },
  extends: [
    "airbnb-base",
    "plugin:jest/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "import/prefer-default-export": "off",
    "jest/valid-title": "off",
    "no-console": "off",
    "no-alert": "off",
    "no-restricted-globals": "off",
    "no-plusplus": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "no-useless-escape": "off",
    "no-param-reassign": "warn",
    "class-methods-use-this": "warn",
    "no-new": "warn",
    "jest/no-conditional-expect": "off",
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
  },
};
