/**
 * Check if a node is an ignored function argument
 *
 * @param node node
 * @return ignoreFunctionArguments object
 */
export default function isIgnoredFunctionArgument(
  node,
  ignoreFunctionArguments,
) {
  if (ignoreFunctionArguments && node?.parent?.type === "func") {
    const { parent } = node;
    const { name, nodes } = parent;
    const ignoredArgs = ignoreFunctionArguments[name];
    const args = getArgs(nodes);

    if (
      ignoredArgs &&
      ignoredArgs.some((arg) => args[arg].some((n) => n === node))
    )
      return true;
  }

  return false;
}

function getArgs(nodes) {
  const args = [];
  let numerics = [];
  for (const node of nodes) {
    if (node.type === "punctuation" && node.value === ",") {
      args.push(numerics);
      numerics = [];
    } else {
      numerics.push(node);
    }
  }
  args.push(numerics);
  return args;
}
