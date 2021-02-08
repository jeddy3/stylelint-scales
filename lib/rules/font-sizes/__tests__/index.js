const { messages, ruleName } = require("..");

testRule({
  ruleName,
  config: [
    {
      scale: [1, 2],
      units: ["em", "rem"],
    },
  ],
  fix: true,

  accept: [
    {
      code: "a { font-size: 1rem; }",
      description: "Value on scale",
    },
    {
      code: "a { font: 2em serif; }",
      description: "Value on scale in shorthand",
    },
    {
      code: "a { font: 400 2em/3rem serif; }",
      description: "Value on scale in shorthand with weight and line height",
    },
  ],

  reject: [
    {
      code: "a { font-size: 3em; }",
      fixed: "a { font-size: 2em; }",
      message: messages.expected("3", "1, 2", "em"),
      line: 1,
      column: 16,
      description: "Value off scale",
    },
    {
      code: "a { font: 3rem sans-serif; }",
      fixed: "a { font: 2rem sans-serif; }",
      message: messages.expected("3", "1, 2", "rem"),
      line: 1,
      column: 11,
      description: "Value off scale in shorthand",
    },
    {
      code: "a { font: 700 3em/4em sans-serif; }",
      fixed: "a { font: 700 2em/4em sans-serif; }",
      message: messages.expected("3", "1, 2", "em"),
      line: 1,
      column: 15,
      description:
        "Value off scale in shorthand with font weight and line-height",
    },
  ],
});
