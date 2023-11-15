import stylelint from "stylelint";

const {
  utils: { ruleMessages },
} = stylelint;

/**
 * Create rule messages with value, scale and unit
 *
 * @param ruleName string
 * @return function
 */
export default function createRuleMessages(ruleName) {
  return ruleMessages(ruleName, {
    expected: (value, scale, unit) =>
      `Expected "${value}" to be one of "${scale}"${
        unit ? ` for "${unit}" unit` : ""
      }`,
  });
}
