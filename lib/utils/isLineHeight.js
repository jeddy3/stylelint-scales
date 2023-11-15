import isSlash from "./isSlash.js";

/**
 * Check if a node represents a line height
 *
 * @param node Node
 * @return bool
 */
export default function isLineHeight(node) {
  const previousNode = node.prev();
  return previousNode && isSlash(previousNode);
}
