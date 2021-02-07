"use strict";

const hasStringScale = require("../hasStringScale");

it("rejects numbers", () => {
  expect(hasStringScale(1)).toBeFalsy();
});

it("rejects objects", () => {
  expect(hasStringScale({})).toBeFalsy();
});

it("rejects empty arrays", () => {
  expect(hasStringScale([])).toBeFalsy();
});

it("rejects numbers values in arrays", () => {
  expect(hasStringScale([0])).toBeFalsy();
});

it("accepts single value arrays", () => {
  expect(hasStringScale(["a"])).toBeTruthy();
});

it("accepts multiple value arrays", () => {
  expect(hasStringScale(["a", "b"])).toBeTruthy();
});
