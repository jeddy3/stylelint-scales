import { testRule } from "stylelint-test-rule-node";

import plugin from "./index.js";

const {
  rule: { messages, ruleName },
} = plugin;

testRule({
  ruleName,
  config: [400, 700],
  fix: true,
  plugins: [plugin],

  accept: [
    {
      code: "a { font-weight: 400; }",
      description: "Value on scale",
    },
    {
      code: "a { font: 400 1px/2 serif; }",
      description: "Value on scale in shorthand",
    },
    {
      code: "a { font-weight: bold; }",
      description: "Ignored value",
    },
    {
      code: "a { font: bold 1px/2 serif; }",
      description: "Ignored value in shorthand",
    },
    {
      code: "a { font: 1px serif; }",
      description: "Ignored font-weightless shorthand",
    },
    {
      code: "a { font: 1px/2 serif; }",
      description:
        "Ignored font-weightless shorthand with unitless line height",
    },
  ],

  reject: [
    {
      code: "a { font-weight: 200 }",
      fixed: "a { font-weight: 400 }",
      message: messages.expected("200", "400, 700"),
      line: 1,
      column: 18,
      description: "Value off scale",
    },
    {
      code: "a { font: 600 3px/3 sans-serif; }",
      fixed: "a { font: 700 3px/3 sans-serif; }",
      message: messages.expected("600", "400, 700"),
      line: 1,
      column: 11,
      description: "Value off scale in shorthand",
    },
    {
      code: "a { font: small-caps 900 3px sans-serif; }",
      fixed: "a { font: small-caps 700 3px sans-serif; }",
      message: messages.expected("900", "400, 700"),
      line: 1,
      column: 22,
      description: "Value off scale in shorthand with preceeding font-variant",
    },
  ],
});
