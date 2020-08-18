const { isArray } = require("lodash");
const {
  createPlugin,
  utils: { report, validateOptions },
} = require("stylelint");

const generateStandardRuleMessage = require("../../utils/generateStandardRuleMessage");
const isStandardSyntaxValue = require("../../utils/isStandardSyntaxValue");
const parseShorthandFont = require("../../utils/parseShorthandFont");

const ruleName = "scales/line-height";
const messages = generateStandardRuleMessage(ruleName);

// Rule accepts an array of numbers for the scale
const rule = (scale) => {
  return (root, result) => {
    // Validate the options
    const validOptions = validateOptions(result, ruleName, {
      actual: scale,
      possible: isArray,
    });
    if (!validOptions) return;
    // Walk through both line-height and font declarations in the source
    // And extract the lineHeight from the shorthand
    root.walkDecls("line-height", (decl) => {
      const { value } = decl;
      check(decl, value);
    });
    root.walkDecls("font", (decl) => {
      const { value } = decl;
      const { lineHeight } = parseShorthandFont(value, result, decl);
      check(decl, lineHeight);
    });
    // Check the line height
    function check(decl, lineHeight) {
      // Return early if not standard value
      if (!isStandardSyntaxValue(lineHeight)) return;
      // Return early if the line height is on the scale
      if (scale.includes(Number(lineHeight))) return;
      // Get message of the violation
      const message = messages.expected(`${lineHeight}`, scale.join(", "));
      // Report the violation to stylelint
      report({
        message,
        node: decl,
        result,
        ruleName,
        word: lineHeight,
      });
    }
  };
};

module.exports = createPlugin(ruleName, rule);
module.exports.ruleName = ruleName;
module.exports.messages = messages;
