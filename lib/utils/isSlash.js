/**
 * Check if a node is a slash
 *
 * @param node Node
 * @return bool
 */
export default function isSlash({ type, value }) {
  return type === "operator" && value === "/";
}
