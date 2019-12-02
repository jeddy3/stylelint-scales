const rule = require("..");
const { messages, ruleName } = rule;

testRule(rule, {
  ruleName,
  config: [[1, 2]],

  accept: [
    {
      code: "a { border-width: 1rem; }",
      description: "Value on scale"
    },
    {
      code: "a { border: 1rem solid grey; }",
      description: "Value on scale"
    },
    {
      code: "a { width: 3px; }",
      description: "Ignored property"
    },
    {
      code: "a { border-width: 3vh; }",
      description: "Ignored unit"
    },
    {
      code: "a { border: none; }",
      description: "none value ignored"
    }
  ],

  reject: [
    {
      code: "a { border-width: 3rem }",
      message: messages.expected("3", "1, 2"),
      line: 1,
      column: 19,
      description: "Value off scale"
    },
    {
      code: "a { border: 3rem solid grey; }",
      message: messages.expected("3", "1, 2"),
      line: 1,
      column: 13,
      description: "Value off scale"
    }
  ]
});
