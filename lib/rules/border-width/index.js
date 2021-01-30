const { isArray, isString } = require("lodash");
const { parse } = require("postcss-values-parser");
const {
  createPlugin,
  utils: { report, validateOptions },
} = require("stylelint");

const {
  absoluteLengths,
  fontRelativeLengths,
} = require("../../reference/valueSets");

const parseShorthandBorder = require("../../utils/parseShorthandBorder");
const generateStandardRuleMessage = require("../../utils/generateStandardRuleMessage");

const lengthUnits = [...absoluteLengths, ...fontRelativeLengths];
const ruleName = "scales/border-width";
const messages = generateStandardRuleMessage(ruleName);

const rule = (scale, options = {}) => {
  return (root, result) => {
    // Validate the options
    const validOptions = validateOptions(
      result,
      ruleName,
      {
        actual: scale,
        possible: isArray,
      },
      {
        actual: options,
        possible: {
          unit: isString,
        },
        optional: true,
      }
    );
    if (!validOptions) return;
    const { unit } = options;
    // Check border-width
    root.walkDecls("border-width", (decl) => {
      const { value } = decl;
      check(decl, value);
    });
    // Check border-width
    root.walkDecls("border", (decl) => {
      const { value } = decl;

      if (value === "none") return;

      const { borderWidth } = parseShorthandBorder(value, result, decl);
      check(decl, borderWidth);
    });
    // Check the size
    function check(decl, size) {
      // Parse the size and walk through Numerics
      parse(size, {
        ignoreUnknownWords: true,
      }).walkNumerics(({ value, unit: valueUnit }) => {
        // Return early if not a checked unit
        if (!lengthUnits.includes(valueUnit)) return;

        // Validate scale and units
        const validUnit = unit ? valueUnit === unit : true;
        const validScale = scale.includes(Math.abs(Number(value)));

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
          word: value,
        });
      });
    }
  };
};

rule.primaryOptionArray = true;
module.exports = createPlugin(ruleName, rule);
module.exports.ruleName = ruleName;
module.exports.messages = messages;
