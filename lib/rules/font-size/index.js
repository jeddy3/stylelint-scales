const { isArray } = require("lodash");
const { parse } = require("postcss-values-parser");
const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions }
} = require("stylelint");

const parseShorthandFont = require("../../utils/parseShorthandFont");
const {
  absoluteLengths,
  fontRelativeLengths
} = require("../../reference/valueSets");

const lengthUnits = [...absoluteLengths, ...fontRelativeLengths];
const ruleName = "scales/font-size";
const messages = ruleMessages(ruleName, {
  expected: (value, scale) => `Expected "${value}" to be one of "${scale}"`
});

const rule = scale => {
  return (root, result) => {
    // Validate the options
    const validOptions = validateOptions(result, ruleName, {
      actual: scale,
      possible: isArray
    });
    if (!validOptions) return;
    // Check font-size and font properties
    // And extract the size from the shorthand
    root.walkDecls("font-size", decl => {
      const { value } = decl;
      check(decl, value);
    });
    root.walkDecls("font", decl => {
      const { value } = decl;
      const { size } = parseShorthandFont(value, result, decl);
      check(decl, size);
    });
    // Check the size
    function check(decl, size) {
      // Parse the size and walk through Numerics
      parse(size, {
        ignoreUnknownWords: true
      }).walkNumerics(({ value, unit }) => {
        // Return early if not an checked unit
        if (!lengthUnits.includes(unit)) return;
        // Return early if the value is on the scale
        if (scale.includes(Number(value))) return;
        // Get message of the violation
        const message = messages.expected(`${value}`, scale.join(", "));
        // Report the violation to stylelint
        report({
          message,
          node: decl,
          result,
          ruleName,
          word: value
        });
      });
    }
  };
};

module.exports = createPlugin(ruleName, rule);
module.exports.ruleName = ruleName;
module.exports.messages = messages;
