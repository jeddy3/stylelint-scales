const { messages, ruleName } = require("..");

testRule({
  ruleName,
  config: [[1, 2]],

  accept: [
    {
      code: "a { border-radius: 1rem; }",
      description: "Value on scale",
    },
    {
      code: "a { border-radius: 1rem 2rem; }",
      description: "Multiple values on scale",
    },
    {
      code: "a { border-top-right-radius: 1rem; }",
      description: "Long hand value on scale",
    },
    {
      code: "a { border-top-right-radius: 0; }",
      description: "Ignored unitless value",
    },
    {
      code: "a { border-bottom-right-radius: calc(100% - 2rem); }",
      description: "Within calc",
    },
    {
      code: "a { width: 3rem; }",
      description: "Ignored property",
    },
    {
      code: "a { border-bottom-left-radius: 3vh; }",
      description: "Unit in units set",
    },
    {
      code: "a { border-top-left-radius: 1rem /* 3rem */ }",
      description: "Ignored comments",
    },
  ],

  reject: [
    {
      code: "a { border-radius: 3rem }",
      message: messages.expected("3rem", "1, 2"),
      line: 1,
      column: 20,
      description: "Value off scale",
    },
    {
      code: "a { border-top-right-radius: 4px }",
      message: messages.expected("4px", "1, 2"),
      line: 1,
      column: 30,
      description: "Long hand value off scale",
    },
    {
      code: "a { border-bottom-left-radius: calc(100% - 3rem); }",
      message: messages.expected("3rem", "1, 2"),
      line: 1,
      column: 44,
      description: "Value off scale within calc",
    },
  ],
});
