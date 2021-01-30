const rule = require("..");
const { messages, ruleName } = rule;

testRule(rule, {
  ruleName,
  config: [[1, 2]],

  accept: [
    {
      code: "a { margin: 1rem; }",
      description: "Value on scale",
    },
    {
      code: "a { margin: -1rem; }",
      description: "Negative value on scale",
    },
    {
      code: "a { margin: 1rem 2rem; }",
      description: "Multiple values on scale",
    },
    {
      code: "a { margin-top: 1rem; }",
      description: "Long hand value on scale",
    },
    {
      code: "a { margin-top: 0; }",
      description: "Ignored unitless value",
    },
    {
      code: "a { grid-gap: calc(100% - 2rem); }",
      description: "Within calc",
    },
    {
      code: "a { width: 3rem; }",
      description: "Ignored property",
    },
    {
      code: "a { grid-column-gap: 2vh; }",
      description: "Value on scale",
    },
    {
      code: "a { margin: 1rem /* 3rem */ }",
      description: "Ignored comments",
    },
  ],

  reject: [
    {
      code: "a { padding: 3rem }",
      message: messages.expected("3rem", "1, 2"),
      line: 1,
      column: 14,
      description: "Value off scale",
    },
    {
      code: "a { margin-top: 4px }",
      message: messages.expected("4px", "1, 2"),
      line: 1,
      column: 17,
      description: "Long hand value off scale",
    },
    {
      code: "a { grid-column-gap: calc(100% - 3rem); }",
      message: messages.expected("3rem", "1, 2"),
      line: 1,
      column: 34,
      description: "Value off scale within calc",
    },
  ],
});

testRule(rule, {
  ruleName,
  config: [
    [
      {
        units: ["em", "rem"],
        scale: [1, 2],
      },
      {
        units: ["px"],
        scale: [3, 4],
      },
    ],
  ],

  accept: [
    {
      code: "a { margin: 1rem; }",
      description: "Value on scale",
    },
    {
      code: "a { margin: 2em; }",
      description: "Value on scale",
    },
    {
      code: "a { margin: 3px; }",
      description: "Value on scale",
    },
    {
      code: "a { margin: 5ch; }",
      description: "Value off scale but off unit",
    },
  ],

  reject: [
    {
      code: "a { padding: 3rem }",
      message: messages.expected("3rem", "1, 2"),
      line: 1,
      column: 14,
      description: "Value off scale",
    },
    {
      code: "a { padding: 1px }",
      message: messages.expected("1px", "3, 4"),
      line: 1,
      column: 14,
      description: "Value off scale",
    },
  ],
});
