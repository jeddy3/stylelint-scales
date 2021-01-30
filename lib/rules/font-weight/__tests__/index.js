const { messages, ruleName } = require("..");

testRule({
  ruleName,
  config: [400, 700, "bold"],

  accept: [
    {
      code: "a { font-weight: 400; }",
      description: "Value on scale",
    },
    {
      code: "a { font-weight: bold; }",
      description: "Value on scale",
    },
    {
      code: "a { font: 700 1px/2 serif; }",
      description: "Value on scale in shorthand",
    },
    {
      code: "a { font: bold 1px/2 serif; }",
      description: "Value on scale in shorthand",
    },
  ],

  reject: [
    {
      code: "a { font-weight: 200 }",
      message: messages.expected("200", "400, 700, bold"),
      line: 1,
      column: 18,
      description: "Value off scale",
    },
    {
      code: "a { font: 600 3px/3 sans-serif; }",
      message: messages.expected("600", "400, 700, bold"),
      line: 1,
      column: 11,
      description: "Value off scale in shorthand",
    },
  ],
});
