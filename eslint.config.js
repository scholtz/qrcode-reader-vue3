const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...compat.config({
    root: true,
    ignorePatterns: ["dist/**", "**/dev-dist/**"],
    env: {
      node: true,
      browser: true,
    },
    extends: ["plugin:vue/essential", "eslint:recommended"],
    parser: "vue-eslint-parser",
    parserOptions: {
      parser: "@typescript-eslint/parser",
      ecmaVersion: 2020,
      sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "vue/multi-word-component-names": "off",
    },
    overrides: [
      {
        files: [
          "**/__tests__/*.{j,t}s?(x)",
          "**/tests/unit/**/*.spec.{j,t}s?(x)",
        ],
        env: {
          mocha: true,
        },
      },
      {
        files: ["**/*.{ts,tsx,vue}", "src/**/*.ts"],
        rules: {
          "no-undef": "off",
          "no-unused-vars": "off",
        },
      },
    ],
  }),
];
