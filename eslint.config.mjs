import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {
    ignores: ["dist/"],
  },
  { files: ["src/**/*.{js,ts,jsx,tsx}", "tests/**/*.{js,ts,jsx,tsx}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
          trailingComma: "es5",
        },
      ],
    },
  },
  eslintPluginPrettierRecommended,
];
