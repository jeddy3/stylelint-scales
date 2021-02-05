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
      code: "a { border-width: 1px; }",
      description: "Value on scale",
    },
    {
      code: "a { border: 1px solid grey; }",
      description: "Value on scale in shorthand",
    },
    {
      code: "a { width: 3px; }",
      description: "Ignored property",
    },
    {
      code: "a { border-width: 3vh; }",
      description: "Ignored unit",
    },
    {
      code: "a { border: none; }",
      description: "Ignored keyword",
    },
  ],

  reject: [
    {
      code: "a { border-width: 3px }",
      fixed: "a { border-width: 2px }",
      message: messages.expected("3", "1, 2", "px"),
      line: 1,
      column: 19,
      description: "Value off scale",
    },
    {
      code: "a { border-block-width: 3px }",
      fixed: "a { border-block-width: 2px }",
      message: messages.expected("3", "1, 2", "px"),
      line: 1,
      column: 25,
      description: "Value off scale in logical property",
    },
    {
      code: "a { border-width: 3px 1.5px }",
      fixed: "a { border-width: 2px 1px }",
      warnings: [
        {
          message: messages.expected("3", "1, 2", "px"),
          line: 1,
          column: 19,
        },
        {
          message: messages.expected("1.5", "1, 2", "px"),
          line: 1,
          column: 23,
        },
      ],
      description: "Multiple values off scale",
    },
    {
      code: "a { border: 3px solid grey; }",
      fixed: "a { border: 2px solid grey; }",
      message: messages.expected("3", "1, 2", "px"),
      line: 1,
      column: 13,
      description: "Value off scale in shorthand",
    },
    {
      code: "a { border-top: 3px solid grey; }",
      fixed: "a { border-top: 2px solid grey; }",
      message: messages.expected("3", "1, 2", "px"),
      line: 1,
      column: 17,
      description: "Value off scale in directional shorthand",
    },
    {
      code: "a { border-block-end: 3px solid grey; }",
      fixed: "a { border-block-end: 2px solid grey; }",
      message: messages.expected("3", "1, 2", "px"),
      line: 1,
      column: 23,
      description: "Value off scale in directional logical shorthand",
    },
    {
      code: "a { border: 3px solid hsl(10deg 10% 5%); }",
      fixed: "a { border: 2px solid hsl(10deg 10% 5%); }",
      message: messages.expected("3", "1, 2", "px"),
      line: 1,
      column: 13,
      description: "Value off scale in shorthand with color function",
    },
  ],
});
