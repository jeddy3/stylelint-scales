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

const ruleName = "scales/alpha-values";
const messages = createRuleMessages(ruleName);
const meta = {
  url: "https://github.com/jeddy3/stylelint-scales/blob/main/lib/rules/alpha-values/README.md",
  fixable: true,
};

const alphaValueProperties = new Set(["opacity", "shape-image-threshold"]);
const alphaValueFunctions = new Set(["hsl", "hwb", "lab", "lch", "rgb"]);

const rule = (primary, secondary, { fix }) => {
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
      let hasFix = false;

      const valueRoot = parse(value, {
        ignoreUnknownWords: true,
      });

      if (isPropertyWithAlphaValue(prop)) {
        valueRoot.walkNumerics((node) => {
          check(node);
        });
      } else {
        valueRoot.walkFuncs(({ type, name, nodes }) => {
          if (!isFunc(type)) return;

          if (!isFuncWithAlphaValue(name)) return;

          const node = findAlphaValue(nodes);

          if (node) check(node);
        });
      }

      function check(node) {
        const { value, unit } = node;

        if (unit !== "%") return;

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

function isPropertyWithAlphaValue(property) {
  return alphaValueProperties.has(property.toLowerCase());
}

function isFuncWithAlphaValue(func) {
  return alphaValueFunctions.has(func.toLowerCase());
}

function isFunc(type) {
  return type === "func";
}

function findAlphaValue(nodes) {
  const slashNodeIndex = nodes.findIndex(
    ({ type, value }) => type === "operator" && value === "/",
  );

  if (slashNodeIndex !== -1) {
    const nodesAfterSlash = nodes.slice(slashNodeIndex + 1, nodes.length);
    return nodesAfterSlash.find(
      ({ type, unit }) => type === "numeric" && unit === "%",
    );
  }
}

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

export default createPlugin(ruleName, rule);
