import { stringify } from "@csstools/css-parser-algorithms";
import stylelint from "stylelint";

import createRuleMessages from "../../utils/createRuleMessages.js";
import findNodeAfterSlash from "../../utils/findNodeAfterSlash.js";
import getClosest from "../../utils/getClosest.js";
import getNumberIndices from "../../utils/getNumberIndices.js";
import getUnit from "../../utils/getUnit.js";
import getValue from "../../utils/getValue.js";
import hasNumericScale from "../../utils/hasNumericScale.js";
import isNumeric from "../../utils/isNumeric.js";
import isOnNumericScale from "../../utils/isOnNumericScale.js";
import mutateNumericValue from "../../utils/mutateNumericValue.js";
import parseValue from "../../utils/parseValue.js";
import setValue from "../../utils/setValue.js";
import walkNumerics from "../../utils/walkNumerics.js";

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

      const componentValues = parseValue(value);

      switch (prop) {
        case "font": {
          const node = findLineHeight(componentValues);
          if (node) check(node);
          break;
        }
        case "line-height":
          walkNumerics(componentValues, check);
          break;
      }

      function check(node) {
        const token = node.value;
        const { value } = token[4];
        const unit = getUnit(token);

        if (unit) return;

        if (isOnNumericScale(primary, value)) return;

        const fix = () => {
          mutateNumericValue(token, getClosest(primary, value));
          setValue(decl, stringify([componentValues]));
        };

        report({
          ...getNumberIndices(decl, token),
          fix,
          message: messages.expected(value, primary.join(", ")),
          node: decl,
          result,
          ruleName,
        });
      }
    });
  };
};

function findLineHeight(nodes) {
  const node = findNodeAfterSlash(nodes);

  if (node && isNumeric(node)) return node;
}

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

export default createPlugin(ruleName, rule);
