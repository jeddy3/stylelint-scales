/**
 * Check if secondary option objects with numeric array
 *
 * @param secondary object
 * @return bool
 */
module.exports = function hasObjectWithNumericArray(secondary) {
  return (
    typeof secondary === "object" &&
    Object.values(secondary).every((array) =>
      array.every((item) => Number.isInteger(item)),
    )
  );
};
