const rule = require("..");
const { messages, ruleName } = rule;

testRule(rule, {
  ruleName,
  config: [[1, 2], { unit: "rem" }],

  accept: [
    {
      code: "a { border-width: 1rem; }",
      description: "Value on scale",
    },
    {
      code: "a { border: 1rem solid grey; }",
      description: "Value on scale",
    },
    {
      code: "a { width: 3px; }",
      description: "Ignored property",
    },
    {
      code: "a { border-width: 3vh; }",
      description: "Ignored unit",
    },
  ],

  reject: [
    {
      code: "a { border-width: 3rem }",
      message: messages.expected("3rem", "1, 2", "rem"),
      line: 1,
      column: 19,
      description: "Value off scale",
    },
    {
      code: "a { border: 3rem solid grey; }",
      message: messages.expected("3rem", "1, 2", "rem"),
      line: 1,
      column: 13,
      description: "Value off scale",
    },
    {
      code: "a { border: 2px solid grey; }",
      message: messages.expected("px", "rem"),
      line: 1,
      column: 13,
      description: "Unit off units scale",
    },
  ],
});
