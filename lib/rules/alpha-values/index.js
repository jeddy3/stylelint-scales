import {
  isFunctionNode,
  stringify,
  walk,
} from "@csstools/css-parser-algorithms";
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

const ruleName = "scales/alpha-values";
const messages = createRuleMessages(ruleName);
const meta = {
  url: "https://github.com/jeddy3/stylelint-scales/blob/main/lib/rules/alpha-values/README.md",
  fixable: true,
};

const alphaValueProperties = new Set(["opacity", "shape-image-threshold"]);
const alphaValueFunctions = new Set(["hsl", "hwb", "lab", "lch", "rgb"]);

const rule = (primary) => {
  return (root, result) => {
    if (
      !validateOptions(result, ruleName, {
        actual: primary,
        possible: hasNumericScale,
      })
    )
      return;

    root.walkDecls((decl) => {
      const { prop } = decl;
      const value = getValue(decl);

      // Alpha values in colour functions follow a slash
      if (!isPropertyWithAlphaValue(prop) && !value.includes("/")) return;

      const componentValues = parseValue(value);

      if (isPropertyWithAlphaValue(prop)) {
        walkNumerics(componentValues, check);
      } else {
        walk(componentValues, ({ node }) => {
          if (!isFunctionNode(node)) return;

          if (!isFuncWithAlphaValue(node.getName())) return;

          const alphaValue = findAlphaValue(node.value);

          if (alphaValue) check(alphaValue);
        });
      }

      function check(node) {
        const token = node.value;
        const { value } = token[4];
        const unit = getUnit(token);

        if (unit !== "%") return;

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

function isPropertyWithAlphaValue(property) {
  return alphaValueProperties.has(property.toLowerCase());
}

function isFuncWithAlphaValue(func) {
  return alphaValueFunctions.has(func.toLowerCase());
}

function findAlphaValue(nodes) {
  const node = findNodeAfterSlash(nodes);

  if (node && isNumeric(node)) return node;
}

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

export default createPlugin(ruleName, rule);
