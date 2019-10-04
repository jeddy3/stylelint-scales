const { isArray } = require("lodash");
const { parse } = require("postcss-values-parser");
const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions }
} = require("stylelint");

const {
  absoluteLengths,
  fontRelativeLengths,
  viewportRelativeLengths
} = require("../../reference/valueSets");

const lengthUnits = [
  ...absoluteLengths,
  ...fontRelativeLengths,
  ...viewportRelativeLengths
];
const ruleName = "scales/sizes";
const messages = ruleMessages(ruleName, {
  expected: (value, scale) => `Expected "${value}" to be one of "${scale}"`
});

// Properties to apply the scale to
const propertyFilter = /^((min|max)-)?(height|width)/;

const rule = scale => {
  return (root, result) => {
    // Validate the options
    const validOptions = validateOptions(result, ruleName, {
      actual: scale,
      possible: isArray
    });
    if (!validOptions) return;
    // Check sizes
    root.walkDecls(propertyFilter, decl => {
      const { value } = decl;
      check(decl, value);
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
