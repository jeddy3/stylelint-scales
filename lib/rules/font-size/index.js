const { isArray, isString } = require("lodash");
const { parse } = require("postcss-values-parser");
const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions }
} = require("stylelint");

const parseShorthandFont = require("../../utils/parseShorthandFont");

const ruleName = "scales/font-size";
const messages = ruleMessages(ruleName, {
  expected: (value, scale) => `Expected "${value}" to be one of "${scale}"`
});

const rule = (
  scale,
  options = {
    unit: "rem"
  }
) => {
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
      // Return early if no units anywhere to avoid needlessly parsing the size
      if (!size.includes(unit)) return;
      // Parse the size and walk through Numerics
      parse(size, {
        ignoreUnknownWords: true
      }).walkNumerics(({ value, unit: valueUnit }) => {
        // Return early for non unit values
        if (valueUnit !== unit) return;
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
