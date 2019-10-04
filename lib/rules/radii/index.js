const { isArray, isString } = require("lodash");
const { parse } = require("postcss-values-parser");
const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions }
} = require("stylelint");

const {
  absoluteLengths,
  fontRelativeLengths
} = require("../../reference/valueSets");

const lengthUnits = [...absoluteLengths, ...fontRelativeLengths];
const ruleName = "scales/radii";
const messages = ruleMessages(ruleName, {
  expected: (value, scale) => `Expected "${value}" to be one of "${scale}"`
});

// Properties to apply the scale to
const propertyFilter = /radius$/;

const rule = (scale, options = {}) => {
  return (root, result) => {
    // Validate the options
    const validOptions = validateOptions(
      result,
      ruleName,
      {
        actual: scale,
        possible: isArray
      },
      {
        actual: options,
        possible: {
          unit: isString
        },
        optional: true
      }
    );
    if (!validOptions) return;
    const { unit } = options;
    // Walk through all the (filtered) declarations in the source
    root.walkDecls(propertyFilter, decl => {
      const { value } = decl;
      // Parse the decl value and walk through Numerics
      parse(value, {
        ignoreUnknownWords: true
      }).walkNumerics(({ value, unit: valueUnit }) => {
        // Return early if not a checked unit
        if (!lengthUnits.includes(valueUnit)) return;

        // Validate scale and units
        const validUnit = unit ? valueUnit === unit : true;
        const validScale = scale.includes(Number(value));

        // Get message of the violation
        let message;
        if (!validScale) {
          message = messages.expected(`${value}`, scale.join(", "));
        } else if (!validUnit) {
          message = messages.expected(`${valueUnit}`, `${unit}`);
        } else {
          return;
        }

        // Report the violation to stylelint
        report({
          message,
          node: decl,
          result,
          ruleName,
          word: value
        });
      });
    });
  };
};

module.exports = createPlugin(ruleName, rule);
module.exports.ruleName = ruleName;
module.exports.messages = messages;
