const rule = require("..");
const { messages, ruleName } = rule;

testRule(rule, {
  ruleName,
  config: [[1, 2], { units: ["px", "em"] }],

  accept: [
    {
      code: "a { font-size: 1px; }",
      description: "Value on scale"
    },
    {
      code: "a { font: 400 1px/1 serif; }",
      description: "Value on scale in shorthand"
    },
    {
      code: "a { width: 3px; }",
      description: "Ignored property"
    },
    {
      code: "a { font-size: 2vh; }",
      description: "Value on scale"
    }
  ],

  reject: [
    {
      code: "a { font-size: 3rem }",
      message: messages.expected("3", "1, 2"),
      line: 1,
      column: 16,
      description: "Value off scale"
    },
    {
      code: "a { font-size: 2rem }",
      message: messages.expected("rem", "px, em"),
      line: 1,
      column: 16,
      description: "Unit off units scale"
    },
    {
      code: "a { font: 700 3px/1 sans-serif; }",
      message: messages.expected("3", "1, 2"),
      line: 1,
      column: 15,
      description: "Value off scale in shorthand"
    },
    {
      code: "a { font: 700 2cm/1 sans-serif; }",
      message: messages.expected("cm", "px, em"),
      line: 1,
      column: 15,
      description: "Unit off units scale in shorthand"
    }
  ]
});
