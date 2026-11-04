import { walk } from "@csstools/css-parser-algorithms";

import isNumeric from "./isNumeric.js";

/**
 * Nested numerics included; the parent lets callers tell function arguments apart
 *
 * @param componentValues ComponentValue[]
 * @param visit function
 * @return null
 */
export default function walkNumerics(componentValues, visit) {
  walk(componentValues, ({ node, parent }) => {
    if (isNumeric(node)) visit(node, parent);
  });
}
