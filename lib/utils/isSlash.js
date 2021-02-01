/**
 * Check if a node is a slash
 *
 * @param node Node
 * @return bool
 */
module.exports = function isSlash({ type, value }) {
  return type === "operator" && value === "/";
};
