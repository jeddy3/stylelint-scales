const valueSets = {};

valueSets.absoluteLengths = new Set(["cm", "mm", "Q", "in", "pt", "pc", "px"]);

valueSets.fontRelativeLengths = new Set([
  "em",
  "ex",
  "cap",
  "ch",
  "ic",
  "rem",
  "lh",
  "rlh"
]);

module.exports = valueSets;
