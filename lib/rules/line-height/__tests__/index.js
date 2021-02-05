const { messages, ruleName } = require("..");

testRule({
  ruleName,
  config: [1, 2],
  fix: true,

  accept: [
    {
      code: "a { line-height: 1; }",
      description: "Value on scale",
    },
    {
      code: "a { font: 400 1px/2 serif; }",
      description: "Value on scale in shorthand",
    },
    {
      code: "a { font: 400 1px/3px serif; }",
      description: "Ignored unit",
    },
  ],

  reject: [
    {
      code: "a { line-height: 3 }",
      fixed: "a { line-height: 2 }",
      message: messages.expected("3", "1, 2"),
      line: 1,
      column: 18,
      description: "Value off scale",
    },
    {
      code: "a { font: 700 3px/3 sans-serif; }",
      fixed: "a { font: 700 3px/2 sans-serif; }",
      message: messages.expected("3", "1, 2"),
      line: 1,
      column: 15,
      description: "Value off scale in shorthand",
    },
  ],
});
