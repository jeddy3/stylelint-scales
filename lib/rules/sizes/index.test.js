import { testRule } from "stylelint-test-rule-node";

import plugin from "./index.js";

const {
  rule: { messages, ruleName },
} = plugin;

testRule({
  ruleName,
  config: [
    {
      scale: [100, 200],
      units: ["px"],
    },
  ],
  fix: true,
  plugins: [plugin],

  accept: [
    {
      code: "a { height: 100px; }",
      description: "Value on scale",
    },
    {
      code: "a { max-height: 200px; }",
      description: "Value on scale in max",
    },
    {
      code: "a { border-image-width: 150px; }",
      description: "Ignored width property",
    },
    {
      code: "a { font-size: 150px; }",
      description: "Ignored size property",
    },
  ],

  reject: [
    {
      code: "a { width: 120px }",
      fixed: "a { width: 100px }",
      message: messages.expected("120", "100, 200", "px"),
      line: 1,
      column: 12,
      description: "Value off scale",
    },
    {
      code: "a { max-width: 300px }",
      fixed: "a { max-width: 200px }",
      message: messages.expected("300", "100, 200", "px"),
      line: 1,
      column: 16,
      description: "Value off scale in max",
    },
    {
      code: "a { block-size: 120px }",
      fixed: "a { block-size: 100px }",
      message: messages.expected("120", "100, 200", "px"),
      line: 1,
      column: 17,
      description: "Value off scale for logical",
    },
    {
      code: "a { min-inline-size: 50px }",
      fixed: "a { min-inline-size: 100px }",
      message: messages.expected("50", "100, 200", "px"),
      line: 1,
      column: 22,
      description: "Value off scale for min logical",
    },
  ],
});
