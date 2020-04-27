const { isArray } = require("lodash");
const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions }
} = require("stylelint");

const isStandardSyntaxValue = require("../../utils/isStandardSyntaxValue");
const parseShorthandFont = require("../../utils/parseShorthandFont");

const ruleName = "scales/font-weight";
const messages = ruleMessages(ruleName, {
  expected: (value, scale) => `Expected "${value}" to be one of "${scale}"`
});

// Rule accepts an array of numbers for the scale
const rule = scale => {
  return (root, result) => {
    // Validate the options
    const validOptions = validateOptions(result, ruleName, {
      actual: scale,
      possible: isArray
    });
    if (!validOptions) return;
    // Walk through both font-weight and font declarations in the source
    // And extract the weight from the shorthand
    root.walkDecls("font-weight", decl => {
      const { value } = decl;
      check(decl, value);
    });
    root.walkDecls("font", decl => {
      const { value } = decl;
      const { weight } = parseShorthandFont(value, result, decl);
      check(decl, weight);
    });
    // Check the line height
    function check(decl, weight) {
      // Return early if not standard value
      if (!isStandardSyntaxValue(weight)) return;

      // Return early if the line height is on the scale
      if (scale.includes(isNaN(parseInt(weight)) ? weight : parseInt(weight)))
        return;

      // Get message of the violation
      const message = messages.expected(`${weight}`, scale.join(", "));
      // Report the violation to stylelint
      report({
        message,
        node: decl,
        result,
        ruleName,
        word: weight
      });
    }
  };
};

module.exports = createPlugin(ruleName, rule);
module.exports.ruleName = ruleName;
module.exports.messages = messages;
