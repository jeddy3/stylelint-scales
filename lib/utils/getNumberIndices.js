import getUnit from "./getUnit.js";
import getValueIndex from "./getValueIndex.js";

/**
 * Covers the number only, as the message quotes it without its unit
 *
 * @param decl Node
 * @param token NumericToken
 * @return { index: number, endIndex: number }
 */
export default function getNumberIndices(decl, token) {
  const valueIndex = getValueIndex(decl);

  return {
    index: valueIndex + token[2],
    endIndex: valueIndex + token[3] + 1 - getUnit(token).length,
  };
}
