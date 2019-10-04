const rule = require("..");
const { messages, ruleName } = rule;

testRule(rule, {
  ruleName,
  config: [[1, 2]],

  accept: [
    {
      code: "a { letter-spacing: 1rem; }",
      description: "Value on scale"
    },
    {
      code: "a { width: 3px; }",
      description: "Ignored property"
    },
    {
      code: "a { letter-spacing: 3vh; }",
      description: "Ignored unit"
    }
  ],

  reject: [
    {
      code: "a { letter-spacing: 3rem }",
      message: messages.expected("3", "1, 2"),
      line: 1,
      column: 21,
      description: "Value off scale"
    }
  ]
});
