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

valueSets.viewportRelativeLengths = new Set([
  "vw",
  "vh",
  "vi",
  "vb",
  "vmin",
  "vmax"
]);

module.exports = valueSets;
