import { testRule } from "stylelint-test-rule-node";

import plugin from "./index.js";

const {
  rule: { messages, ruleName },
} = plugin;

testRule({
  ruleName,
  config: [
    {
      scale: [1.5, 2.25],
      units: ["em", "rem"],
    },
    {
      scale: [3, 4],
      units: ["px"],
    },
  ],
  fix: true,
  plugins: [plugin],

  accept: [
    {
      code: "a { margin: 1.5rem; }",
      description: "Value on scale",
    },
    {
      code: "a { margin: -1.5rem; }",
      description: "Negative value on scale",
    },
    {
      code: "a { margin: 1.5rem 2.25rem; }",
      description: "Multiple values on scale",
    },
    {
      code: "a { margin: calc(100% - 2.25rem); }",
      description: "Value on scale within calc",
    },
    {
      code: "a { margin: 0; }",
      description: "Ignored unitless value",
    },
    {
      code: "a { margin: 1ch; }",
      description: "Ignored unit",
    },
    {
      code: "a { width: 3rem; }",
      description: "Ignored property",
    },
    {
      code: "a { margin: 1.5rem /* 3rem */ }",
      description: "Ignored in comment",
    },
  ],

  reject: [
    {
      code: "a { padding: 2rem }",
      fixed: "a { padding: 2.25rem }",
      message: messages.expected("2", "1.5, 2.25", "rem"),
      line: 1,
      column: 14,
      description: "Value off scale",
    },
    {
      code: "a { padding: -2rem }",
      fixed: "a { padding: -2.25rem }",
      message: messages.expected("2", "1.5, 2.25", "rem"),
      line: 1,
      column: 14,
      description: "Negative value off scale",
    },
    {
      code: "a { row-gap: 5px }",
      fixed: "a { row-gap: 4px }",
      message: messages.expected("5", "3, 4", "px"),
      line: 1,
      column: 14,
      description: "Value off scale using gap property",
    },
    {
      code: "a { inset-block-end: 5px }",
      fixed: "a { inset-block-end: 4px }",
      message: messages.expected("5", "3, 4", "px"),
      line: 1,
      column: 22,
      description: "Value off scale for inset longhand",
    },
    {
      code: "a { margin-inline-start: 2px }",
      fixed: "a { margin-inline-start: 3px }",
      message: messages.expected("2", "3, 4", "px"),
      line: 1,
      column: 26,
      description: "Value off scale for logical margin",
    },
    {
      code: "a { padding: 0.5px /* comment */ 1rem }",
      fixed: "a { padding: 3px /* comment */ 1.5rem }",
      warnings: [
        {
          message: messages.expected("0.5", "3, 4", "px"),
          line: 1,
          column: 14,
        },
        {
          message: messages.expected("1", "1.5, 2.25", "rem"),
          line: 1,
          column: 34,
        },
      ],
      description: "Values off scale and split by comment",
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
      code: "a { gap: 1rem; }",
      description: "Value on scale",
    },
    {
      code: "a { gap: clamp(1rem, 0.5rem + 0.5vw, 2rem); }",
      description: "Value off scale for ignored argument",
    },
    {
      code: "a { gap: min(0.5rem, 1rem); }",
      description: "Value off scale for ignored argument",
    },
    {
      code: "a { gap: max(0.5rem, 2.5rem); }",
      description: "Two values off scale both ignored",
    },
  ],

  reject: [
    {
      code: "a { gap: 3rem; }",
      fixed: "a { gap: 2rem; }",
      message: messages.expected("3", "1, 2", "rem"),
      line: 1,
      column: 10,
      description: "Value off scale",
    },
    {
      code: "a { gap: min(0.5rem, 2.5rem); }",
      fixed: "a { gap: min(0.5rem, 2rem); }",
      message: messages.expected("2.5", "1, 2", "rem"),
      line: 1,
      column: 22,
      description: "Two values off scale with one ignored",
    },
    {
      code: "a { gap: clamp(0.5rem, 0.3rem + 0.5vw, 2.5rem); }",
      fixed: "a { gap: clamp(1rem, 0.3rem + 0.5vw, 2rem); }",
      warnings: [
        {
          message: messages.expected("0.5", "1, 2", "rem"),
          line: 1,
          column: 16,
        },
        {
          message: messages.expected("2.5", "1, 2", "rem"),
          line: 1,
          column: 40,
        },
      ],
      description: "Two values off scale",
    },
  ],
});
