import getUnit from "./getUnit.js";

/**
 * Updates the string representation too, like `mutateUnit` from the tokenizer
 *
 * @param token NumericToken
 * @param value number
 * @return null
 */
export default function mutateNumericValue(token, value) {
  token[1] = `${value}${getUnit(token)}`;
  token[4].value = value;
}
