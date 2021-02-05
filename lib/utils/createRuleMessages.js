const {
  utils: { ruleMessages },
} = require("stylelint");

/**
 * Create rule messages with value, scale and unit
 *
 * @param ruleName string
 * @return function
 */
module.exports = function createRuleMessages(ruleName) {
  return ruleMessages(ruleName, {
    expected: (value, scale, unit) =>
      `Expected "${value}" to be one of "${scale}"${
        unit ? ` for "${unit}" unit` : ""
      }`,
  });
};
