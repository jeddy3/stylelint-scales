const rule = require("..");
const { messages, ruleName } = rule;

testRule(rule, {
  ruleName,
  config: [[1, 2]],

  accept: [
    {
      code: "a { margin: 1rem; }",
      description: "Value on scale"
    },
    {
      code: "a { margin: -1rem; }",
      description: "Negative value on scale"
    },
    {
      code: "a { margin: 1rem 2rem; }",
      description: "Multiple values on scale"
    },
    {
      code: "a { margin-top: 1rem; }",
      description: "Long hand value on scale"
    },
    {
      code: "a { margin-top: 0; }",
      description: "Ignored unitless value"
    },
    {
      code: "a { grid-gap: calc(100% - 2rem); }",
      description: "Within calc"
    },
    {
      code: "a { width: 3rem; }",
      description: "Ignored property"
    },
    {
      code: "a { border: 1px; }",
      description: "Ignored unit"
    },
    {
      code: "a { margin: 1rem /* 3rem */ }",
      description: "Ignored comments"
    }
  ],

  reject: [
    {
      code: "a { padding: 3rem }",
      message: messages.expected("3", "1, 2"),
      line: 1,
      column: 14,
      description: "Value off scale"
    },
    {
      code: "a { margin-top: 4rem }",
      message: messages.expected("4", "1, 2"),
      line: 1,
      column: 17,
      description: "Long hand value off scale"
    },
    {
      code: "a { grid-gap: calc(100% - 3rem); }",
      message: messages.expected("3", "1, 2"),
      line: 1,
      column: 27,
      description: "Value off scale within calc"
    }
  ]
});

testRule(rule, {
  ruleName,
  config: [[1, 2], { unit: "px" }],

  accept: [
    {
      code: "a { margin: 1px; }",
      description: "Value on scale"
    },
    {
      code: "a { margin: 3rem; }",
      description: "Ignored unit"
    }
  ],

  reject: [
    {
      code: "a { margin: 3px }",
      message: messages.expected("3", "1, 2"),
      line: 1,
      column: 13,
      description: "Value off scale"
    }
  ]
});