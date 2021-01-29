const { messages, ruleName } = require("..");

testRule({
  ruleName,
  config: [[-1, 1, 2]],

  accept: [
    {
      code: "a { z-index: 1 }",
      description: "Value on scale",
    },
    {
      code: "a { z-index: -1 }",
      description: "Value on scale",
    },
    {
      code: "a { border-width: 1px }",
      description: "Ignored property",
    },
  ],

  reject: [
    {
      code: "a { z-index: 3 }",
      message: messages.expected("3", "-1, 1, 2"),
      line: 1,
      column: 14,
      description: "Value off scale",
    },
    {
      code: "a { z-index: -2 }",
      message: messages.expected("-2", "-1, 1, 2"),
      line: 1,
      column: 14,
      description: "Value off scale",
    },
    {
      code: "a { z-index: 0 }",
      message: messages.expected("0", "-1, 1, 2"),
      line: 1,
      column: 14,
      description: "Value off scale",
    },
  ],
});
