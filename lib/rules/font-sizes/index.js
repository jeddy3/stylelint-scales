import { parse } from "postcss-values-parser";
import stylelint from "stylelint";

import createRuleMessages from "../../utils/createRuleMessages.js";
import findScaleByUnit from "../../utils/findScaleByUnit.js";
import getClosest from "../../utils/getClosest.js";
import getValue from "../../utils/getValue.js";
import hasScalesWithUnits from "../../utils/hasScalesWithUnits.js";
import hasObjectWithNumericArray from "../../utils/hasObjectWithNumericArray.js";
import isIgnoredFunctionArgument from "../../utils/isIgnoredFunctionArgument.js";
import isLineHeight from "../../utils/isLineHeight.js";
import isOnNumericScale from "../../utils/isOnNumericScale.js";
import setValue from "../../utils/setValue.js";

const {
  createPlugin,
  utils: { report, validateOptions },
} = stylelint;

const ruleName = "scales/font-sizes";
const messages = createRuleMessages(ruleName);
const meta = {
  url: "https://github.com/jeddy3/stylelint-scales/blob/main/lib/rules/font-sizes/README.md",
  fixable: true,
};

const propertyFilter = /^font-size$|^font$/;

const rule = (primary, secondary) => {
  return (root, result) => {
    if (
      !validateOptions(
        result,
        ruleName,
        {
          actual: primary,
          possible: hasScalesWithUnits,
        },
        {
          optional: true,
          actual: secondary,
          possible: {
            ignoreFunctionArguments: hasObjectWithNumericArray,
          },
        },
      )
    )
      return;

    const ignoreFunctionArguments = secondary?.ignoreFunctionArguments;

    root.walkDecls(propertyFilter, (decl) => {
      const { prop } = decl;
      const value = getValue(decl);

      const valueRoot = parse(value, {
        ignoreUnknownWords: true,
      });

      switch (prop) {
        case "font": {
          const node = findFontSize(valueRoot.nodes);
          if (node) check(node);
          break;
        }
        case "font-size":
          valueRoot.walkNumerics((node) => {
            check(node);
          });
          break;
      }

      function check(node) {
        const { value, unit } = node;

        if (isIgnoredFunctionArgument(node, ignoreFunctionArguments)) return;

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

function findFontSize(nodes) {
  const node = nodes.find(
    ({ type, unit }) => type === "numeric" && unit !== "",
  );

  if (node && !isLineHeight(node)) return node;
}

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

export default createPlugin(ruleName, rule);
