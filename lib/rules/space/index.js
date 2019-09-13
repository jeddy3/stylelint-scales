const { isArray, isString } = require("lodash");
const { parse } = require("postcss-values-parser");
const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions }
} = require("stylelint");

const ruleName = "scales/space";
const messages = ruleMessages(ruleName, {
  expected: (value, scale) => `Expected "${value}" to be one of "${scale}"`
});

// Properties to apply the scale to
const propertyFilter = /^border|box-shadow|grid-gap|^margin|^padding/;

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
    // Walk through all the (filtered) declarations in the source
    root.walkDecls(propertyFilter, decl => {
      const { value } = decl;
      // Return early if no pixels anywhere to avoid needlessly parsing decl value
      if (!value.includes(unit)) return;
      // Parse the decl value and walk through Numerics
      parse(value, {
        ignoreUnknownWords: true
      }).walkNumerics(({ value, unit: numericUnit }) => {
        // Return early for non pixel values
        if (numericUnit !== unit) return;
        // Return early if the value is on the scale
        if (scale.includes(Math.abs(Number(value)))) return;
        // Get  message of the violation
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
    });
  };
};

module.exports = createPlugin(ruleName, rule);
module.exports.ruleName = ruleName;
module.exports.messages = messages;
