/**
 * Find scale by unit in option
 *
 * @param option array
 * @param unit string
 * @return array | void
 */
export default function findScaleByUnit(option, unit) {
  const match = option.find((scales) =>
    scales.units.some((scaleUnit) => scaleUnit === unit),
  );
  if (match) return match.scale;
}
