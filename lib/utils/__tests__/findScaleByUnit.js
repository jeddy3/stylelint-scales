"use strict";

import hasScalesWithUnits from "../hasScalesWithUnits.js";

it("rejects strings", () => {
  expect(hasScalesWithUnits("string")).toBeFalsy();
});

it("rejects objects", () => {
  expect(hasScalesWithUnits({})).toBeFalsy();
});

it("rejects empty arrays", () => {
  expect(hasScalesWithUnits([])).toBeFalsy();
});

it("rejects empty objects", () => {
  expect(hasScalesWithUnits([{}])).toBeFalsy();
});

it("rejects missing units property", () => {
  expect(hasScalesWithUnits([{ scales: [0] }])).toBeFalsy();
});

it("rejects missing scales property", () => {
  expect(hasScalesWithUnits([{ units: ["px"] }])).toBeFalsy();
});

it("rejects string instead of array", () => {
  expect(hasScalesWithUnits([{ units: "px", scale: [0] }])).toBeFalsy();
});

it("rejects non-numeric scale values", () => {
  expect(hasScalesWithUnits([{ units: ["px"], scale: ["0"] }])).toBeFalsy();
});

it("rejects non-string unit values", () => {
  expect(hasScalesWithUnits([{ units: [0], scale: [0] }])).toBeFalsy();
});

it("accepts single value arrays", () => {
  expect(hasScalesWithUnits([{ units: ["px"], scale: [0] }])).toBeTruthy();
});

it("accepts multiple value arrays", () => {
  expect(
    hasScalesWithUnits([{ units: ["px", "em"], scale: [0, 10] }]),
  ).toBeTruthy();
});
