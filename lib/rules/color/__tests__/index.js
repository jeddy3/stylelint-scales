const rule = require("..");
const { messages, ruleName } = rule;

testRule(rule, {
  ruleName,
  config: [
    [
      [0, 0, 0],
      [1, 1, 1],
    ],
    { alphaScale: ["0.25", "0.5"] },
  ],

  accept: [
    {
      code: "a { color: rgb(0, 0, 0); }",
      description: "RGB on scale",
    },
    {
      code: "a { background: liner-gradient(top rgb(0, 0, 0)); }",
      description: "RGB on scale in func",
    },
    {
      code: "a { background: url(x.svg) rgb(0, 0, 0) no-repeat; }",
      description: "RGB on scale in shorthand property",
    },
    {
      code: "a { color: rgba(0, 0, 0, 0.25); }",
      description: "RGBA on scale",
    },
    {
      code: "a { border: 1px solid rgba(0, 0, 0, 0.25); }",
      description: "RGBA on scale",
    },
  ],

  reject: [
    {
      code: "a { color: rgb(0, 0, 1) }",
      message: messages.expected("0,0,1", "0,0,0, 1,1,1"),
      line: 1,
      column: 12,
      description: "RGB off scale",
    },
    {
      code: "a { color: rgba(0, 0, 0, 0.1) }",
      message: messages.expected("0.1", "0.25, 0.5"),
      line: 1,
      column: 12,
      description: "RGBA off scale",
    },
    {
      code: "a { background: liner-gradient(top rgb(0, 0, 1)); }",
      message: messages.expected("0,0,1", "0,0,0, 1,1,1"),
      line: 1,
      column: 36,
      description: "RGB off scale in func",
    },
  ],
});
