const { messages, ruleName } = require("..");

testRule({
  ruleName,
  config: [-1, 1, 2],
  fix: true,

  accept: [
    {
      code: "a { z-index: 1 }",
      description: "Value on scale",
    },
    {
      code: "a { z-index: -1 }",
      description: "Negative value on scale",
    },
    {
      code: "a { border-width: 1px }",
      description: "Ignored property",
    },
  ],

  reject: [
    {
      code: "a { z-index: 3 }",
      fixed: "a { z-index: 2 }",
      message: messages.expected("3", "-1, 1, 2"),
      line: 1,
      column: 14,
      description: "Value off scale",
    },
    {
      code: "a { z-index: -2 }",
      fixed: "a { z-index: -1 }",
      message: messages.expected("-2", "-1, 1, 2"),
      line: 1,
      column: 14,
      description: "Negative value off scale",
    },
    {
      code: "a { z-index: 0.5 }",
      fixed: "a { z-index: 1 }",
      message: messages.expected("0.5", "-1, 1, 2"),
      line: 1,
      column: 14,
      description: "Factional value off scale",
    },
  ],
});
