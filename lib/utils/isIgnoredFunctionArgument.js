import { isFunctionNode, isTokenNode } from "@csstools/css-parser-algorithms";
import { isTokenComma } from "@csstools/css-tokenizer";

/**
 * Check if a node is an ignored function argument
 *
 * @param node ComponentValue
 * @param parent ContainerNode
 * @param ignoreFunctionArguments object
 * @return bool
 */
export default function isIgnoredFunctionArgument(
  node,
  parent,
  ignoreFunctionArguments,
) {
  if (!ignoreFunctionArguments || !isFunctionNode(parent)) return false;

  const ignoredArgs = ignoreFunctionArguments[parent.getName()];

  if (!ignoredArgs) return false;

  return ignoredArgs.includes(getArgumentIndex(parent.value, node));
}

function getArgumentIndex(nodes, node) {
  return nodes.slice(0, nodes.indexOf(node)).filter(isComma).length;
}

function isComma(node) {
  return isTokenNode(node) && isTokenComma(node.value);
}
