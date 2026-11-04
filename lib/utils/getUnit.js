import { isTokenDimension, isTokenPercentage } from "@csstools/css-tokenizer";

/**
 * `%` for a percentage, empty for a plain number
 *
 * @param token NumericToken
 * @return string
 */
export default function getUnit(token) {
  if (isTokenDimension(token)) return token[4].unit;
  if (isTokenPercentage(token)) return "%";
  return "";
}
