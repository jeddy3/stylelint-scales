import { isWhiteSpaceOrCommentNode } from "@csstools/css-parser-algorithms";

import isSlash from "./isSlash.js";

/**
 * The line height in `font` or the alpha value in a colour function
 *
 * @param nodes ComponentValue[]
 * @return ComponentValue | void
 */
export default function findNodeAfterSlash(nodes) {
  const slashNodeIndex = nodes.findIndex(isSlash);

  if (slashNodeIndex === -1) return;

  return nodes
    .slice(slashNodeIndex + 1)
    .find((node) => !isWhiteSpaceOrCommentNode(node));
}
