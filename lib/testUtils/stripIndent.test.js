import { test } from "node:test";
import { strict as assert } from "node:assert";

import stripIndent from "./stripIndent.js";

test("strips the shortest indentation and trims the surrounding whitespace", () => {
  assert.equal(
    stripIndent`
      a {}
    b {}
      c {}
  `,
    "a {}\nb {}\n  c {}",
  );
});

test("strips nothing when a line with content has no indentation", () => {
  assert.equal(
    stripIndent`
file.css
  1:1  foo
  `,
    "file.css\n  1:1  foo",
  );
});

test("ignores lines without content when measuring", () => {
  assert.equal(
    stripIndent`
      a {}

      b {}
  `,
    "a {}\n\nb {}",
  );
});

test("counts characters, so a tab and a space are the same width", () => {
  assert.equal(
    stripIndent`
      a {}
\t      b {}
  `,
    "a {}\n b {}",
  );
});

test("measures lines created by escape sequences", () => {
  assert.equal(
    stripIndent`
      a {}\n\t\t\t\t\t\tb {}
  `,
    "a {}\nb {}",
  );
});

test("interpolates values", () => {
  const value = "red";

  assert.equal(
    stripIndent`
      a { color: ${value}; }
  `,
    "a { color: red; }",
  );
});

test("returns an empty string for a template without content", () => {
  assert.equal(
    stripIndent`
  `,
    "",
  );
});
