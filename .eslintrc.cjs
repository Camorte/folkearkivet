module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb-base",
    "prettier",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript"
  ],
  plugins: ["prettier", "@typescript-eslint"],
  rules: {
    "no-underscore-dangle": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "no-use-before-define": "error",
    "no-undef": "error",
    "import/prefer-default-export": "off",
    "no-nested-ternary": "error",
    "class-methods-use-this": [0],
    "import/extensions": [0],
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true
      }
    ],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error"
  },
  parserOptions: {
    ecmaVersion: 2021
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    react: {
      version: "detect"
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true
      },
      node: {
        extensions: [".js", ".test.js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src"]
      }
    }
  }
}
