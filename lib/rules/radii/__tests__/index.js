const { messages, ruleName } = require("..");

testRule({
  ruleName,
  config: [
    {
      scale: [1, 2],
      units: ["px"],
    },
  ],
  fix: true,

  accept: [
    {
      code: "a { border-radius: 1px; }",
      description: "Value on scale",
    },
    {
      code: "a { border-top-right-radius: 1px; }",
      description: "Value on scale in longhand",
    },
    {
      code: "a { border-radius: 1px 2px; }",
      description: "Multiple values on scale",
    },
    {
      code: "a { border-bottom-right-radius: calc(100% - 2px); }",
      description: "Value on scale within calc",
    },
    {
      code: "a { border-top-right-radius: 0; }",
      description: "Ignored unitless value",
    },
    {
      code: "a { width: 3rem; }",
      description: "Ignored property",
    },
    {
      code: "a { border-bottom-left-radius: 3vh; }",
      description: "Ignored unit",
    },
    {
      code: "a { border-top-left-radius: 1px /* 3px */ }",
      description: "Ignored within comment",
    },
  ],

  reject: [
    {
      code: "a { border-radius: 3px }",
      fixed: "a { border-radius: 2px }",
      message: messages.expected("3", "1, 2", "px"),
      line: 1,
      column: 20,
      description: "Value off scale",
    },
    {
      code: "a { border-radius: 0.5px 5px }",
      fixed: "a { border-radius: 1px 2px }",
      warnings: [
        {
          message: messages.expected("0.5", "1, 2", "px"),
          line: 1,
          column: 20,
        },
        { message: messages.expected("5", "1, 2", "px"), line: 1, column: 22 },
      ],

      description: "Multiple values off scale",
    },
    {
      code: "a { border-top-right-radius: 4px }",
      fixed: "a { border-top-right-radius: 2px }",
      message: messages.expected("4", "1, 2", "px"),
      line: 1,
      column: 30,
      description: "Value off scale in longhand",
    },
    {
      code: "a { border-bottom-left-radius: calc(100% - 3px); }",
      fixed: "a { border-bottom-left-radius: calc(100% - 2px); }",
      message: messages.expected("3", "1, 2", "px"),
      line: 1,
      column: 44,
      description: "Value off scale within calc",
    },
  ],
});
