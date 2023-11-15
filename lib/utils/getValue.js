/**
 * Get the value from a decl node
 * Getting from `raw` when neccessary to ensure comments are included
 *
 * @param decl Node
 * @return string
 */
export default function getValue(decl) {
  return decl.raws.value ? decl.raws.value.raw : decl.value;
}
