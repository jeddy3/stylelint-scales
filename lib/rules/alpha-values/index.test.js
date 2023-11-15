import { stripIndent } from "common-tags";
import { testRule } from "stylelint-test-rule-node";

import plugin from "./index.js";
const {
  rule: { messages, ruleName },
} = plugin;

testRule({
  ruleName,
  config: [10, 20],
  fix: true,
  plugins: [plugin],

  accept: [
    {
      code: "a { opacity: 10%; }",
      description: "Value on scale",
    },
    {
      code: "a { opacity: 0.5; }",
      description: "Number value",
    },
    {
      code: "a { color: hsl(0deg 0% 0% / 10%) }",
      description: "Value on scale in function",
    },
    {
      code: "a { color: hsl(0deg 0% 0% / 0.5) }",
      description: "Number value in function",
    },
    {
      code: "a { color: hsl(0deg 0% 0%) }",
      description: "Value on scale in function",
    },
    {
      code: "a { color: hsl(var(--accent) / 10%) }",
      description: "Value on scale in function with var",
    },
  ],

  reject: [
    {
      code: "a { opacity: 5% }",
      fixed: "a { opacity: 10% }",
      message: messages.expected("5", "10, 20"),
      line: 1,
      column: 14,
      description: "Value off scale",
    },
    {
      code: "a { shape-image-threshold: 25% }",
      fixed: "a { shape-image-threshold: 20% }",
      message: messages.expected("25", "10, 20"),
      line: 1,
      column: 28,
      description: "Value off scale for shape",
    },
    {
      code: "a { color: hsl(0deg 0% 0% / 5%) }",
      fixed: "a { color: hsl(0deg 0% 0% / 10%) }",
      message: messages.expected("5", "10, 20"),
      line: 1,
      column: 29,
      description: "Value off scale in function",
    },
    {
      code: "a { color: hsl(0deg 0% 0% / /* comment */ 5% /* comment */) }",
      fixed: "a { color: hsl(0deg 0% 0% / /* comment */ 10% /* comment */) }",
      message: messages.expected("5", "10, 20"),
      line: 1,
      column: 43,
      description: "Value off scale in function with comments",
    },
    {
      code: "a { color: rgb(0 0 0 / 5%) }",
      fixed: "a { color: rgb(0 0 0 / 10%) }",
      message: messages.expected("5", "10, 20"),
      line: 1,
      column: 24,
      description: "Value off scale in rgb function",
    },
    {
      code: "a { color: hsl(var(--accent) / 5%) }",
      fixed: "a { color: hsl(var(--accent) / 10%) }",
      message: messages.expected("5", "10, 20"),
      line: 1,
      column: 32,
      description: "Value off scale in function with var",
    },
    {
      code: stripIndent`
        a {
          background-image: linear-gradient(
            to right,
            hwb(0deg 0% 0% / 5%)
            lch(0% 0 0 / 25%)
          );
        }
      `,
      fixed: stripIndent`
        a {
          background-image: linear-gradient(
            to right,
            hwb(0deg 0% 0% / 10%)
            lch(0% 0 0 / 20%)
          );
        }
      `,
      warnings: [
        { message: messages.expected("5", "10, 20"), line: 4, column: 22 },
        { message: messages.expected("25", "10, 20"), line: 5, column: 18 },
      ],
      description: "Values off scale",
    },
  ],
});
