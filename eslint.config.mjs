import globals from "globals";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        testRule: true,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
];
