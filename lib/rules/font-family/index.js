const { isArray } = require("lodash");
const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions }
} = require("stylelint");
const { parse: parseFontFamily } = require("font-family");

const isStandardSyntaxValue = require("../../utils/isStandardSyntaxValue");
const parseShorthandFont = require("../../utils/parseShorthandFont");

const ruleName = "scales/font-family";
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
    // Walk through both font-family and font declarations in the source
    // And extract the family from the shorthand
    // Then check each font-family found
    root.walkDecls("font-family", decl => {
      const values = parseFontFamily(decl.value);
      values.forEach(value => check(decl, value));
    });
    root.walkDecls("font", decl => {
      const { value } = decl;
      if (value === "inherit") {
        check(decl, value);
      } else {
        const { family } = parseShorthandFont(value, result, decl);

        family.forEach(value => check(decl, value));
      }
    });
    // Check the font family
    function check(decl, family) {
      // Return early if not standard value
      if (!isStandardSyntaxValue(family)) return;

      // Return early if the font family is on the scale or value is inherit
      if ([...scale, "inherit"].includes(family)) return;
      // Get message of the violation
      const message = messages.expected(`${family}`, scale.join(", "));
      // Report the violation to stylelint
      report({
        message,
        node: decl,
        result,
        ruleName,
        word: family
      });
    }
  };
};

module.exports = createPlugin(ruleName, rule);
module.exports.ruleName = ruleName;
module.exports.messages = messages;
