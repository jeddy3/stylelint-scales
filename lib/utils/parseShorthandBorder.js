var border = require("css-border-property");
const camelCase = require("camelcase");

/**
 * Attempts to parse a border shorthand
 * and attaches a warning to the stylelint result if it can't
 *
 * This is needed to stop editor extensions displaying errors
 */
module.exports = function parseShorthandBorder(value, result, node) {
  try {
    const parsed = border.parse(value).reduce((memo, item) => {
      memo[camelCase(item.property)] = item.value;
      return memo;
    }, {});

    return parsed;
  } catch (e) {
    result.warn("Cannot parse border shorthand", {
      node,
      stylelintType: "parseError"
    });
    return {
      borderColor: "",
      borderWidth: "",
      borderStyle: ""
    };
  }
};
