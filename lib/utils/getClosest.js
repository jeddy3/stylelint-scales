/**
 * Get the closest number in an scale
 *
 * @param scale array
 * @param actual number
 * @return number
 */
export default function (scale, actual) {
  return scale.reduce(function (prev, curr) {
    return Math.abs(curr - actual) < Math.abs(prev - actual) ? curr : prev;
  });
}
