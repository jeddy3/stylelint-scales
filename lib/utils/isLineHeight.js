import findNodeAfterSlash from "./findNodeAfterSlash.js";

/**
 * Check if a node represents a line height
 *
 * @param nodes ComponentValue[]
 * @param node ComponentValue
 * @return bool
 */
export default function isLineHeight(nodes, node) {
  return findNodeAfterSlash(nodes) === node;
}
