import { parse } from "postcss-values-parser";
import stylelint from "stylelint";

import createRuleMessages from "../../utils/createRuleMessages.js";
import findScaleByUnit from "../../utils/findScaleByUnit.js";
import getClosest from "../../utils/getClosest.js";
import getValue from "../../utils/getValue.js";
import hasScalesWithUnits from "../../utils/hasScalesWithUnits.js";
import isOnNumericScale from "../../utils/isOnNumericScale.js";
import setValue from "../../utils/setValue.js";

const {
  createPlugin,
  utils: { report, validateOptions },
} = stylelint;

const ruleName = "scales/border-widths";
const messages = createRuleMessages(ruleName);
const meta = {
  url: "https://github.com/jeddy3/stylelint-scales/blob/main/lib/rules/border-widths/README.md",
  fixable: true,
};

const propertyFilter =
  /^border$|^border.*(width$|top$|right$|bottom$|left$|block$|inline$|start$|end$)/;

const rule = (primary) => {
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

      const valueRoot = parse(value, {
        ignoreUnknownWords: true,
      });

      valueRoot.walkNumerics((node) => {
        check(node);
      });

      function check(node) {
        const { value, unit } = node;

        const scale = findScaleByUnit(primary, unit);

        if (isOnNumericScale(scale, value)) return;

        const fix = () => {
          node.value = getClosest(scale, value);
          setValue(decl, valueRoot.toString());
        };

        report({
          fix,
          message: messages.expected(value, scale.join(", "), unit),
          node: decl,
          result,
          ruleName,
          word: value,
        });
      }
    });
  };
};

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

export default createPlugin(ruleName, rule);
