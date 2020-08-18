const { isArray } = require("lodash");
const { parse } = require("postcss-values-parser");
const {
  createPlugin,
  utils: { report, validateOptions },
} = require("stylelint");

const generateStandardRuleMessage = require("../../utils/generateStandardRuleMessage");

const ruleName = "scales/z-indices";
const messages = generateStandardRuleMessage(ruleName);

// Properties to apply the scale to
const propertyFilter = /z-index$/;

const rule = (scale) => {
  return (root, result) => {
    // Validate the options
    const validOptions = validateOptions(result, ruleName, {
      actual: scale,
      possible: isArray,
    });
    if (!validOptions) return;
    // Walk through all the (filtered) declarations in the source
    root.walkDecls(propertyFilter, (decl) => {
      const { value } = decl;
      // Parse the decl value and walk through Numerics
      parse(value, {
        ignoreUnknownWords: true,
      }).walkNumerics(({ value }) => {
        // Return early if the value is on the scale
        if (scale.includes(Number(value))) return;
        // Get  message of the violation
        const message = messages.expected(`${value}`, scale.join(", "));
        // Report the violation to stylelint
        report({
          message,
          node: decl,
          result,
          ruleName,
          word: value,
        });
      });
    });
  };
};

module.exports = createPlugin(ruleName, rule);
module.exports.ruleName = ruleName;
module.exports.messages = messages;
