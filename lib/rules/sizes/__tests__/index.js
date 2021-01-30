const { messages, ruleName } = require("..");

testRule({
  ruleName,
  config: [100, 200],

  accept: [
    {
      code: "a { height: 200px; }",
      description: "Value on scale",
    },
    {
      code: "a { max-height: 200px; }",
      description: "Value on scale",
    },
    {
      code: "a { font-size: 3px; }",
      description: "Ignored property",
    },
    {
      code: "a { width: 100vh; }",
      description: "Value on scale",
    },
    {
      code: "a { max-width: 100vh; }",
      description: "Value on scale",
    },
    {
      code: "a { border-image-width: 150vh; }",
      description: "Ignored property",
    },
  ],

  reject: [
    {
      code: "a { width: 120rem }",
      message: messages.expected("120rem", "100, 200"),
      line: 1,
      column: 12,
      description: "Value off scale",
    },
    {
      code: "a { max-width: 120rem }",
      message: messages.expected("120rem", "100, 200"),
      line: 1,
      column: 16,
      description: "Value off scale",
    },
  ],
});
