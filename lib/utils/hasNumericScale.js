/**
 * Check if primary option is a numeric scale
 *
 * @param primary array
 * @return bool
 */
export default function hasNumericScale(primary) {
  return (
    Array.isArray(primary) &&
    primary.length > 0 &&
    primary.every((value) => Number.isFinite(value))
  );
}
