const { messages, ruleName } = require("..");

testRule({
  ruleName,
  config: [1, 2],

  accept: [
    {
      code: "a { line-height: 1; }",
      description: "Value on scale",
    },
    {
      code: "a { font: 400 1px/2 serif; }",
      description: "Value on scale in shorthand",
    },
  ],

  reject: [
    {
      code: "a { line-height: 3 }",
      message: messages.expected("3", "1, 2"),
      line: 1,
      column: 18,
      description: "Value off scale",
    },
    {
      code: "a { font: 700 3px/3 sans-serif; }",
      message: messages.expected("3", "1, 2"),
      line: 1,
      column: 15,
      description: "Value off scale in shorthand",
    },
    {
      code: "a { line-height: 13px }",
      message: messages.expected("13px", "1, 2"),
      line: 1,
      column: 18,
      description: "Value has unit",
    },
  ],
});
