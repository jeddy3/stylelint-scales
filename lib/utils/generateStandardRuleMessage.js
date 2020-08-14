const {
  utils: { ruleMessages }
} = require("stylelint");

/**
 * Generates a standard rule message with value, scale and unit
 */
module.exports = function createStandardRuleMessage(ruleName) {
  return ruleMessages(ruleName, {
    expected: (value, scale, unit) =>
      `Expected "${value}" to be one of "${scale}" ${
        unit ? `with unit "${unit}"` : ""
      }`
  });
};
