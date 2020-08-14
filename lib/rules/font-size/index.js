const { isArray, isString } = require("lodash");
const { parse } = require("postcss-values-parser");
const {
  createPlugin,
  utils: { report, validateOptions }
} = require("stylelint");

const generateStandardRuleMessage = require("../../utils/generateStandardRuleMessage");
const parseShorthandFont = require("../../utils/parseShorthandFont");
const {
  absoluteLengths,
  fontRelativeLengths
} = require("../../reference/valueSets");

const lengthUnits = [...absoluteLengths, ...fontRelativeLengths];
const ruleName = "scales/font-size";
const messages = generateStandardRuleMessage(ruleName);

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
      }).walkNumerics(({ value, unit: valueUnit }) => {
        // Return early if not a checked unit
        if (!lengthUnits.includes(valueUnit)) return;

        // Validate scale and units
        const validUnit = unit ? valueUnit === unit : true;
        const validScale = scale.includes(Number(value));

        // Get message of the violation
        let message;
        if (!validScale) {
          message = messages.expected(
            `${value}${valueUnit}`,
            scale.join(", "),
            unit
          );
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
    }
  };
};

module.exports = createPlugin(ruleName, rule);
module.exports.ruleName = ruleName;
module.exports.messages = messages;
