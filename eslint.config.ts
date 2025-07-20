import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  prettierPlugin,
  {
    rules: {
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        global: true,
      },
      parserOptions: {
        project: "./tsconfig.json"
      }
    },
  },
  {
    ignores: ["coverage/*", "dist/*"],
  },
];
