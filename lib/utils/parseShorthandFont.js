const parseCssFont = require("parse-css-font");

/**
 * Attempts to parse a font shorthand
 * and attaches a warning to the stylelint result if it can't
 *
 * This is needed to stop editor extensions displaying errors
 */
module.exports = function parseShorthandFont(value, result, node) {
  try {
    return parseCssFont(value);
  } catch (e) {
    result.warn("Cannot parse font shorthand", {
      node,
      stylelintType: "parseError"
    });
    return {
      lineHeight: "",
      weight: "",
      size: "",
      family: [],
      style: ""
    };
  }
};
