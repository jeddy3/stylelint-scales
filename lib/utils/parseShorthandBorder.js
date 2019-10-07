var border = require("css-border-property");

/**
 * Attempts to parse a border shorthand
 * and attaches a warning to the stylelint result if it can't
 *
 * This is needed to stop editor extensions displaying errors
 */
module.exports = function parseShorthandBorder(value, result, node) {
  try {
    const parsed = border.parse(value).reduce((memo, item) => {
      switch (item.property) {
        case "border-color":
          memo.borderColor = item.value;
          break;
        case "border-style":
          memo.borderStyle = item.value;
          break;
        case "border-width":
          memo.borderWidth = item.value;
          break;
        default:
          memo[item.property] = item.value;
      }
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
