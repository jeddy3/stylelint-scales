import { isTokenNode } from "@csstools/css-parser-algorithms";
import { isTokenNumeric } from "@csstools/css-tokenizer";

/**
 * Check if a node is a number, dimension or percentage token
 *
 * @param node ComponentValue
 * @return bool
 */
export default function isNumeric(node) {
  return isTokenNode(node) && isTokenNumeric(node.value);
}
