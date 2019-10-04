const rule = require("..");
const { messages, ruleName } = rule;

testRule(rule, {
  ruleName,
  config: [{ scale: [1, 2], units: ["rem", "px"] }],

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
    },
    {
      code: "a { letter-spacing: 1em }",
      message: messages.expected("em", "rem, px"),
      line: 1,
      column: 21,
      description: "Unit off units scale"
    }
  ]
});
