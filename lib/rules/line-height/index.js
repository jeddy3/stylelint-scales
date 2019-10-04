const { isArray } = require("lodash");
const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions }
} = require("stylelint");
const { parse } = require("postcss-values-parser");

const isStandardSyntaxValue = require("../../utils/isStandardSyntaxValue");
const parseShorthandFont = require("../../utils/parseShorthandFont");

const ruleName = "scales/line-height";
const messages = ruleMessages(ruleName, {
  expected: (value, scale) => `Expected "${value}" to be one of "${scale}"`
});

// Rule accepts an array of numbers for the scale
const rule = ({ scale, units }) => {
  return (root, result) => {
    // Validate the options
    const validScaleOptions = validateOptions(result, ruleName, {
      actual: scale,
      possible: isArray
    });
    const validUnitOptions = validateOptions(result, ruleName, {
      actual: units,
      possible: isArray
    });
    if (!validScaleOptions || !validUnitOptions) return;
    // Walk through both line-height and font declarations in the source
    // And extract the lineHeight from the shorthand
    root.walkDecls("line-height", decl => {
      const { value } = decl;
      check(decl, value);
    });
    root.walkDecls("font", decl => {
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

      parse(lineHeight, {
        ignoreUnknownWords: true
      }).walkNumerics(({ value, unit }) => {
        const validScale = scale ? scale.includes(Number(value)) : true;
        const validUnits = units ? units.includes(unit) : true;

        if (validUnits && validScale) return;

        let message;
        // Get message of the violation
        if (!validScale) {
          message = messages.expected(`${lineHeight}`, scale.join(", "));
        } else {
          message = messages.expected(`${unit}`, units.join(", "));
        }

        // Report the violation to stylelint
        report({
          message,
          node: decl,
          result,
          ruleName,
          word: lineHeight
        });
      });
    }
  };
};

module.exports = createPlugin(ruleName, rule);
module.exports.ruleName = ruleName;
module.exports.messages = messages;
