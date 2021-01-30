const rule = require("..");
const { messages, ruleName } = rule;

testRule(rule, {
  ruleName,
  config: [[1, 2]],

  accept: [
    {
      code: "a { font-size: 1px; }",
      description: "Value on scale",
    },
    {
      code: "a { font: 400 1px/1 serif; }",
      description: "Value on scale in shorthand",
    },
    {
      code: "a { width: 3px; }",
      description: "Ignored property",
    },
    {
      code: "a { font-size: 2vh; }",
      description: "Ignored unit",
    },
  ],

  reject: [
    {
      code: "a { font-size: 3em; }",
      message: messages.expected("3em", "1, 2"),
      line: 1,
      column: 16,
      description: "Value off scale",
    },
    {
      code: "a { font: 700 3px/1 sans-serif; }",
      message: messages.expected("3px", "1, 2"),
      line: 1,
      column: 15,
      description: "Value off scale in shorthand",
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
      code: "a { font-size: 3px; }",
      description: "Value on scale",
    },
    {
      code: "a { font: 400 1rem/1 serif; }",
      description: "Value on scale in shorthand",
    },
  ],

  reject: [
    {
      code: "a { font-size: 3em; }",
      message: messages.expected("3em", "1, 2"),
      line: 1,
      column: 16,
      description: "Value off scale",
    },
    {
      code: "a { font: 700 1px/1 sans-serif; }",
      message: messages.expected("1px", "3, 4"),
      line: 1,
      column: 15,
      description: "Value off scale in shorthand",
    },
  ],
});
