/**
 * Check if option is an array of scales with units
 *
 * @param primary array
 * @return bool
 */
module.exports = function hasScalesWithUnits(primary) {
  return (
    Array.isArray(primary) &&
    primary.length > 0 &&
    primary.every(
      (obj) =>
        typeof obj === "object" &&
        "scale" in obj &&
        "units" in obj &&
        Array.isArray(obj.scale) &&
        obj.scale.length > 0 &&
        obj.scale.every((value) => Number.isFinite(value)) &&
        Array.isArray(obj.units) &&
        obj.units.length > 0 &&
        obj.units.every((value) => typeof value === "string"),
    )
  );
};
