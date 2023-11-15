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

const ruleName = "scales/line-heights";
const messages = createRuleMessages(ruleName);
const meta = {
  url: "https://github.com/jeddy3/stylelint-scales/blob/main/lib/rules/line-heights/README.md",
  fixable: true,
};

const propertyFilter = /^line-height$|^font$/;

const rule = (primary, secondary, { fix }) => {
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
      let hasFix = false;

      const valueRoot = parse(value, {
        ignoreUnknownWords: true,
      });

      switch (prop) {
        case "font": {
          const node = findLineHeight(valueRoot.nodes);
          if (node) check(node);
          break;
        }
        case "line-height":
          valueRoot.walkNumerics((node) => {
            check(node);
          });
          break;
      }

      function check(node) {
        const { value, unit } = node;

        if (unit) return;

        if (isOnNumericScale(primary, value)) return;

        if (fix) {
          node.value = getClosest(primary, value);
          hasFix = true;
          return;
        }

        report({
          message: messages.expected(value, primary.join(", ")),
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

function findLineHeight(nodes) {
  const node = nodes.find(
    ({ type, value }) => type === "operator" && value === "/",
  );
  if (node) return node.next();
}

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

export default createPlugin(ruleName, rule);
