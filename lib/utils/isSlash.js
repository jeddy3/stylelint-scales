import { isTokenNode } from "@csstools/css-parser-algorithms";
import { isTokenDelim } from "@csstools/css-tokenizer";

/**
 * Check if a node is a slash
 *
 * @param node ComponentValue
 * @return bool
 */
export default function isSlash(node) {
  return (
    isTokenNode(node) && isTokenDelim(node.value) && node.value[4].value === "/"
  );
}
