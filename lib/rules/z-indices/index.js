import { parse } from "postcss-values-parser";
import stylelint from "stylelint";

import createRuleMessages from "../../utils/createRuleMessages.js";
import getClosest from "../../utils/getClosest.js";
import getValue from "../../utils/getValue.js";
import hasNumericScale from "../../utils/hasNumericScale.js";
import isOnNumericScale from "../../utils/isOnNumericScale.js";
import setValue from "../../utils/setValue.js";

const {
  createPlugin,
  utils: { report, validateOptions },
} = stylelint;

const ruleName = "scales/z-indices";
const messages = createRuleMessages(ruleName);
const meta = {
  url: "https://github.com/jeddy3/stylelint-scales/blob/main/lib/rules/z-indices/README.md",
  fixable: true,
};

const propertyFilter = "z-index";

const rule = (primary) => {
  return (root, result) => {
    if (
      !validateOptions(result, ruleName, {
        actual: primary,
        possible: hasNumericScale,
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

        if (unit) return;

        if (isOnNumericScale(primary, value)) return;

        const fix = () => {
          node.value = getClosest(primary, value);
          setValue(decl, valueRoot.toString());
        };

        report({
          fix,
          message: messages.expected(value, primary.join(", ")),
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
