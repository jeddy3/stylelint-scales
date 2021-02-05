const isSlash = require("./isSlash");

/**
 * Check if a node represents a line height
 *
 * @param node Node
 * @return bool
 */
module.exports = function isLineHeight(node) {
  const previousNode = node.prev();
  return previousNode && isSlash(previousNode);
};
