/**
 * Get the index of a declaration's value within the declaration string,
 * so token offsets can be reported
 *
 * @param decl Node
 * @return number
 */
export default function getValueIndex(decl) {
  const { prop, between, value } = decl.raws;

  return [
    prop?.prefix,
    prop?.raw ?? decl.prop,
    prop?.suffix,
    between ?? ":",
    value?.prefix,
  ].join("").length;
}
