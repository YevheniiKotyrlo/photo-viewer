module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "react-app",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
