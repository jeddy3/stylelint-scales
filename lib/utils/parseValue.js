import { parseListOfComponentValues } from "@csstools/css-parser-algorithms";
import { tokenize } from "@csstools/css-tokenizer";

/**
 * Tokenizes forgivingly, so values with SCSS or Less syntax still parse
 *
 * @param value string
 * @return ComponentValue[]
 */
export default function parseValue(value) {
  return parseListOfComponentValues(tokenize({ css: value }));
}
