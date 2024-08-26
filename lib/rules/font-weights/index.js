import { parse } from "postcss-values-parser";
import stylelint from "stylelint";

import createRuleMessages from "../../utils/createRuleMessages.js";
import getClosest from "../../utils/getClosest.js";
import getValue from "../../utils/getValue.js";
import hasNumericScale from "../../utils/hasNumericScale.js";
import isLineHeight from "../../utils/isLineHeight.js";
import isOnNumericScale from "../../utils/isOnNumericScale.js";
import setValue from "../../utils/setValue.js";

const {
  createPlugin,
  utils: { report, validateOptions },
} = stylelint;

const ruleName = "scales/font-weights";
const messages = createRuleMessages(ruleName);
const meta = {
  url: "https://github.com/jeddy3/stylelint-scales/blob/main/lib/rules/font-weights/README.md",
  fixable: true,
};

const propertyFilter = /^font-weight$|^font$/;

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
      const { prop } = decl;
      const value = getValue(decl);

      const valueRoot = parse(value, {
        ignoreUnknownWords: true,
      });

      switch (prop) {
        case "font": {
          const node = findFontWeight(valueRoot.nodes);
          if (node) check(node);
          break;
        }
        case "font-weight":
          valueRoot.walkNumerics((node) => {
            check(node);
          });
          break;
      }

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

function findFontWeight(nodes) {
  const node = nodes.find(
    ({ type, unit }) => type === "numeric" && unit === "",
  );

  if (node && !isLineHeight(node)) return node;
}

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

export default createPlugin(ruleName, rule);
