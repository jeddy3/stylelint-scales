/**
 * Check if option is an array of scales with units
 *
 * @param primary array
 * @return bool
 */
module.exports = function hasScalesWithUnits(primary) {
  return primary.every(
    (obj) =>
      typeof obj === "object" &&
      "scale" in obj &&
      "units" in obj &&
      obj.scale.length > 0 &&
      obj.units.length > 0
  );
};
