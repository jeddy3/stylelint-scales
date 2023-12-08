/**
 * Set the value of a decl node
 * Setting `raw` when neccessary to ensure comments are included
 *
 * @param decl Node
 * @param value string
 * @return null
 */
export default function setValue(decl, value) {
  if (decl.raws.value) decl.raws.value.raw = value;
  else decl.value = value;
}
