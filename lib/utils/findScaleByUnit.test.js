import { test } from "node:test";
import { strict as assert } from "node:assert";

import hasScalesWithUnits from "./hasScalesWithUnits.js";

test("rejects strings", () => {
  assert.equal(hasScalesWithUnits("string"), false);
});

test("rejects objects", () => {
  assert.equal(hasScalesWithUnits({}), false);
});

test("rejects empty arrays", () => {
  assert.equal(hasScalesWithUnits([]), false);
});

test("rejects empty objects", () => {
  assert.equal(hasScalesWithUnits([{}]), false);
});

test("rejects missing units property", () => {
  assert.equal(hasScalesWithUnits([{ scales: [0] }]), false);
});

test("rejects missing scales property", () => {
  assert.equal(hasScalesWithUnits([{ units: ["px"] }]), false);
});

test("rejects string instead of array", () => {
  assert.equal(hasScalesWithUnits([{ units: "px", scale: [0] }]), false);
});

test("rejects non-numeric scale values", () => {
  assert.equal(hasScalesWithUnits([{ units: ["px"], scale: ["0"] }]), false);
});

test("rejects non-string unit values", () => {
  assert.equal(hasScalesWithUnits([{ units: [0], scale: [0] }]), false);
});

test("accepts single value arrays", () => {
  assert.equal(hasScalesWithUnits([{ units: ["px"], scale: [0] }]), true);
});

test("accepts multiple value arrays", () => {
  assert.equal(
    hasScalesWithUnits([{ units: ["px", "em"], scale: [0, 10] }]),
    true,
  );
});
