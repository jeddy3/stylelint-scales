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

const ruleName = "scales/space";
const messages = ruleMessages(ruleName, {
  expected: (value, scale) => `Expected "${value}" to be one of "${scale}"`
});

// Properties to apply the scale to
const propertyFilter = /grid.*-gap|^margin|^padding/;

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
    // Walk through all the (filtered) declarations in the source
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
        // Return early if not a checked unit
        if (!lengthUnits.includes(unit)) return;

        // Validate scale and units
        const validScale = scale.includes(Math.abs(Number(value)));
        const validUnits = units ? units.includes(unit) : true;

        // Get message of the violation
        let message;
        if (!validScale) {
          message = messages.expected(`${value}`, scale.join(", "));
        } else if (!validUnits) {
          message = messages.expected(`${unit}`, units.join(", "));
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
    }
  };
};

module.exports = createPlugin(ruleName, rule);
module.exports.ruleName = ruleName;
module.exports.messages = messages;
