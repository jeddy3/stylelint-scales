import { parse } from "postcss-values-parser";
import stylelint from "stylelint";

import createRuleMessages from "../../utils/createRuleMessages.js";
import findScaleByUnit from "../../utils/findScaleByUnit.js";
import getClosest from "../../utils/getClosest.js";
import getValue from "../../utils/getValue.js";
import hasScalesWithUnits from "../../utils/hasScalesWithUnits.js";
import hasObjectWithNumericArray from "../../utils/hasObjectWithNumericArray.js";
import isIgnoredFunctionArgument from "../../utils/isIgnoredFunctionArgument.js";
import isOnNumericScale from "../../utils/isOnNumericScale.js";
import setValue from "../../utils/setValue.js";

const {
  createPlugin,
  utils: { report, validateOptions },
} = stylelint;

const ruleName = "scales/space";
const messages = createRuleMessages(ruleName);
const meta = {
  url: "https://github.com/jeddy3/stylelint-scales/blob/main/lib/rules/space/README.md",
  fixable: true,
};

const propertyFilter = /^inset|gap|^margin|^padding/;

const rule = (primary, secondary, { fix }) => {
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

        if (isIgnoredFunctionArgument(node, ignoreFunctionArguments)) return;

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

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

export default createPlugin(ruleName, rule);
