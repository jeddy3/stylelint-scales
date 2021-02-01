const { parse } = require("postcss-values-parser");
const {
  createPlugin,
  utils: { report, validateOptions },
} = require("stylelint");

const createRuleMessages = require("../../utils/createRuleMessages");
const findScaleByUnit = require("../../utils/findScaleByUnit");
const getClosest = require("../../utils/getClosest");
const getValue = require("../../utils/getValue");
const hasScalesWithUnits = require("../../utils/hasScalesWithUnits");
const isOnNumericScale = require("../../utils/isOnNumericScale");
const setValue = require("../../utils/setValue");

const ruleName = "scales/space";
const messages = createRuleMessages(ruleName);

const propertyFilter = /^inset|gap|^margin|^padding/;

const rule = (primary, secondary, { fix }) => {
  return (root, result) => {
    if (
      !validateOptions(result, ruleName, {
        actual: primary,
        possible: hasScalesWithUnits,
      })
    )
      return;

    root.walkDecls(propertyFilter, (decl) => {
      const value = getValue(decl);
      let hasFix = false;

      const valueRoot = parse(value, {
        ignoreUnknownWords: true,
      });

      valueRoot.walkNumerics((node) => {
        check(node);
      });

      function check(node) {
        const { value, unit } = node;
        const absoluteValue = Math.abs(value);

        const scale = findScaleByUnit(primary, unit);

        if (isOnNumericScale(scale, absoluteValue)) return;

        if (fix) {
          const closest = getClosest(scale, absoluteValue);
          node.value = value >= 0 ? closest : -closest;
          hasFix = true;
          return;
        }

        report({
          message: messages.expected(absoluteValue, scale.join(", "), unit),
          node: decl,
          result,
          ruleName,
          word: value,
        });
      }

      if (hasFix) setValue(decl, valueRoot.toString());
    });
  };
};

rule.primaryOptionArray = true;

module.exports = createPlugin(ruleName, rule);
module.exports.ruleName = ruleName;
module.exports.messages = messages;
