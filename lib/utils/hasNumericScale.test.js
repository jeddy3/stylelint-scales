import { test } from "node:test";
import { strict as assert } from "node:assert";

import hasNumericScale from "./hasNumericScale.js";

test("rejects strings", () => {
  assert.equal(hasNumericScale("1"), false);
});

test("rejects objects", () => {
  assert.equal(hasNumericScale({}), false);
});

test("rejects empty arrays", () => {
  assert.equal(hasNumericScale([]), false);
});

test("rejects string values in arrays", () => {
  assert.equal(hasNumericScale(["0"]), false);
});

test("accepts single value arrays", () => {
  assert.equal(hasNumericScale([0]), true);
});

test("accepts multiple value arrays", () => {
  assert.equal(hasNumericScale([0, 1]), true);
});
