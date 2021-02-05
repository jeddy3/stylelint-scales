const { messages, ruleName } = require("..");

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
