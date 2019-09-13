const rule = require("..");
const { messages, ruleName } = rule;

testRule(rule, {
  ruleName,
  config: [[400, 700]],

  accept: [
    {
      code: "a { font-weight: 400; }",
      description: "Value on scale"
    },
    {
      code: "a { font: 700 1px/2 serif; }",
      description: "Value on scale in shorthand"
    }
  ],

  reject: [
    {
      code: "a { font-weight: 200 }",
      message: messages.expected("200", "400, 700"),
      line: 1,
      column: 18,
      description: "Value off scale"
    },
    {
      code: "a { font: 600 3px/3 sans-serif; }",
      message: messages.expected("600", "400, 700"),
      line: 1,
      column: 11,
      description: "Value off scale in shorthand"
    }
  ]
});