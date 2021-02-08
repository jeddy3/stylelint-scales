/**
 * Check if primary option is a numeric scale
 *
 * @param primary array
 * @return bool
 */
module.exports = function hasNumericScale(primary) {
  return (
    Array.isArray(primary) &&
    primary.length > 0 &&
    primary.every((value) => Number.isFinite(value))
  );
};
