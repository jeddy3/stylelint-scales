import { testRule } from "stylelint-test-rule-node";

import plugin from "./index.js";

const {
  rule: { messages, ruleName },
} = plugin;

testRule({
  ruleName,
  config: [
    {
      scale: [-1, 2],
      units: ["px"],
    },
  ],
  fix: true,
  plugins: [plugin],

  accept: [
    {
      code: "a { word-spacing: -1px; }",
      description: "Value on scale",
    },
    {
      code: "a { width: 3px; }",
      description: "Ignored property",
    },
    {
      code: "a { word-spacing: 3vh; }",
      description: "Ignored unit",
    },
  ],

  reject: [
    {
      code: "a { word-spacing: 3px }",
      fixed: "a { word-spacing: 2px }",
      message: messages.expected("3", "-1, 2", "px"),
      line: 1,
      column: 19,
      description: "Value off scale",
    },
    {
      code: "a { word-spacing: -0.5px }",
      fixed: "a { word-spacing: -1px }",
      message: messages.expected("-0.5", "-1, 2", "px"),
      line: 1,
      column: 19,
      description: "Negative value off scale",
    },
  ],
});
