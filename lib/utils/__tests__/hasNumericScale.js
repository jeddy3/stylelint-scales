"use strict";

import hasNumericScale from "../hasNumericScale.js";

it("rejects strings", () => {
  expect(hasNumericScale("1")).toBeFalsy();
});

it("rejects objects", () => {
  expect(hasNumericScale({})).toBeFalsy();
});

it("rejects empty arrays", () => {
  expect(hasNumericScale([])).toBeFalsy();
});

it("rejects string values in arrays", () => {
  expect(hasNumericScale(["0"])).toBeFalsy();
});

it("accepts single value arrays", () => {
  expect(hasNumericScale([0])).toBeTruthy();
});

it("accepts multiple value arrays", () => {
  expect(hasNumericScale([0, 1])).toBeTruthy();
});
