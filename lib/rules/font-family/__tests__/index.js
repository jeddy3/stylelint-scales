const rule = require("..");
const { messages, ruleName } = rule;

testRule(rule, {
  ruleName,
  config: [["Times New Roman", "Times", "serif"]],

  accept: [
    {
      code: "a { font-family: Times; }",
      description: "Value on scale",
    },
    {
      code: "a { font-family: inherit; }",
      description: "Allows inherit value",
    },
    {
      code: "a { font-family: initial; }",
      description: "Allows initial value",
    },
    {
      code: "a { font-family: Times, serif; }",
      description: "Multiple values on scale",
    },
    {
      code: 'a { font-family: "Times New Roman", Times, serif; }',
      description: "Multiple values on scale with quotes",
    },
    {
      code: "a { font: 400 1rem/1 serif; }",
      description: "Value on scale in shorthand",
    },
    {
      code: "a { font: 400 1rem/1 Times, serif; }",
      description: "Multiple values on scale in shorthand",
    },
    {
      code: 'a { font: 400 1rem/1 "Times New Roman", Times, serif; }',
      description: "Multiple values on scale with quotes in shorthand",
    },
  ],

  reject: [
    {
      code: "a { font-family: Tahoma; }",
      message: messages.expected("Tahoma", "Times New Roman, Times, serif"),
      line: 1,
      column: 18,
      description: "Value off scale",
    },
    {
      code: "a { font-family: Times, Tahoma; }",
      message: messages.expected("Tahoma", "Times New Roman, Times, serif"),
      line: 1,
      column: 25,
      description: "One of multiple values off scale",
    },
    {
      code: 'a { font-family: "Times New Roman", Times, Tahoma; }',
      message: messages.expected("Tahoma", "Times New Roman, Times, serif"),
      line: 1,
      column: 44,
      description: "One of multiple values off scale with quotes",
    },
    {
      code: "a { font: 400 1rem/1 Tahoma; }",
      message: messages.expected("Tahoma", "Times New Roman, Times, serif"),
      line: 1,
      column: 22,
      description: "Value off scale in shorthand",
    },
    {
      code: "a { font: 400 1rem/1 Times, Tahoma; }",
      message: messages.expected("Tahoma", "Times New Roman, Times, serif"),
      line: 1,
      column: 29,
      description: "One of multiple values off scale in shorthand",
    },
    {
      code: 'a { font: 400 1rem/1 "Times New Roman", Times, Tahoma; }',
      message: messages.expected("Tahoma", "Times New Roman, Times, serif"),
      line: 1,
      column: 48,
      description: "One of multiple values off scale with quotes in shorthand",
    },
  ],
});
