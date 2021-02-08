/**
 * Check if primary option is a string scale
 *
 * @param primary array
 * @return bool
 */
module.exports = function hasStringScale(primary) {
  return (
    Array.isArray(primary) &&
    primary.length > 0 &&
    primary.every((value) => typeof value === "string")
  );
};
