import { testRule } from "stylelint-test-rule-node";

import plugin from "./index.js";

const {
  rule: { messages, ruleName },
} = plugin;

testRule({
  ruleName,
  config: [
    {
      scale: [1, 2],
      units: ["em", "rem"],
    },
  ],
  fix: true,
  plugins: [plugin],

  accept: [
    {
      code: "a { font-size: 1rem; }",
      description: "Value on scale",
    },
    {
      code: "a { font: 2em serif; }",
      description: "Value on scale in shorthand",
    },
    {
      code: "a { font: 400 2em/3rem serif; }",
      description: "Value on scale in shorthand with weight and line height",
    },
  ],

  reject: [
    {
      code: "a { font-size: 3em; }",
      fixed: "a { font-size: 2em; }",
      message: messages.expected("3", "1, 2", "em"),
      line: 1,
      column: 16,
      description: "Value off scale",
    },
    {
      code: "a { font: 3rem sans-serif; }",
      fixed: "a { font: 2rem sans-serif; }",
      message: messages.expected("3", "1, 2", "rem"),
      line: 1,
      column: 11,
      description: "Value off scale in shorthand",
    },
    {
      code: "a { font: 700 3em/4em sans-serif; }",
      fixed: "a { font: 700 2em/4em sans-serif; }",
      message: messages.expected("3", "1, 2", "em"),
      line: 1,
      column: 15,
      description:
        "Value off scale in shorthand with font weight and line-height",
    },
  ],
});

testRule({
  ruleName,
  config: [
    [
      {
        scale: [1, 2],
        units: ["rem"],
      },
    ],
    {
      ignoreFunctionArguments: {
        clamp: [1],
        min: [0],
        max: [0, 1],
      },
    },
  ],
  fix: true,
  plugins: [plugin],

  accept: [
    {
      code: "a { font-size: 1rem; }",
      description: "Value on scale",
    },
    {
      code: "a { font-size: clamp(1rem, 0.5rem + 0.5vw, 2rem); }",
      description: "Value off scale for ignored argument",
    },
    {
      code: "a { font-size: min(0.5rem, 1rem); }",
      description: "Value off scale for ignored argument",
    },
    {
      code: "a { font-size: max(0.5rem, 2.5rem); }",
      description: "Two values off scale both ignored",
    },
  ],

  reject: [
    {
      code: "a { font-size: 3rem; }",
      fixed: "a { font-size: 2rem; }",
      message: messages.expected("3", "1, 2", "rem"),
      line: 1,
      column: 16,
      description: "Value off scale",
    },
    {
      code: "a { font-size: min(0.5rem, 2.5rem); }",
      fixed: "a { font-size: min(0.5rem, 2rem); }",
      message: messages.expected("2.5", "1, 2", "rem"),
      line: 1,
      column: 28,
      description: "Two values off scale with one ignored",
    },
    {
      code: "a { font-size: clamp(0.5rem, 0.3rem + 0.5vw, 2.5rem); }",
      fixed: "a { font-size: clamp(1rem, 0.3rem + 0.5vw, 2rem); }",
      warnings: [
        {
          message: messages.expected("0.5", "1, 2", "rem"),
          line: 1,
          column: 22,
        },
        {
          message: messages.expected("2.5", "1, 2", "rem"),
          line: 1,
          column: 46,
        },
      ],
      description: "Two values off scale",
    },
  ],
});
