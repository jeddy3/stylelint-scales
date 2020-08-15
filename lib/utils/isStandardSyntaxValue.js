"use strict";

/**
 * Checks whether a CSS value conforms to standard syntax
 */
module.exports = function (value) {
  let normalizedValue = value;

  // Ignore operators before variables (example -$variable)
  if (/^[-+*/]/.test(value[0])) {
    normalizedValue = normalizedValue.slice(1);
  }

  // SCSS variable or styled components expression
  if (normalizedValue[0] === "$") {
    return false;
  }

  return true;
};
