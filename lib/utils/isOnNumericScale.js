/**
 * Check if number is on a scale
 *
 * @param scale array
 * @param value number
 * @return bool
 */
module.exports = function isOnNumericScale(scale, number) {
  return scale === undefined || scale.includes(Number(number));
};
