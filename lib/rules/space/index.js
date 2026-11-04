import { stringify } from "@csstools/css-parser-algorithms";
import stylelint from "stylelint";

import createRuleMessages from "../../utils/createRuleMessages.js";
import findScaleByUnit from "../../utils/findScaleByUnit.js";
import getClosest from "../../utils/getClosest.js";
import getNumberIndices from "../../utils/getNumberIndices.js";
import getUnit from "../../utils/getUnit.js";
import getValue from "../../utils/getValue.js";
import hasObjectWithNumericArray from "../../utils/hasObjectWithNumericArray.js";
import hasScalesWithUnits from "../../utils/hasScalesWithUnits.js";
import isIgnoredFunctionArgument from "../../utils/isIgnoredFunctionArgument.js";
import isOnNumericScale from "../../utils/isOnNumericScale.js";
import mutateNumericValue from "../../utils/mutateNumericValue.js";
import parseValue from "../../utils/parseValue.js";
import setValue from "../../utils/setValue.js";
import walkNumerics from "../../utils/walkNumerics.js";

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
      const value = getValue(decl);

      const componentValues = parseValue(value);

      walkNumerics(componentValues, check);

      function check(node, parent) {
        const token = node.value;
        const { value } = token[4];
        const unit = getUnit(token);
        const absoluteValue = Math.abs(value);

        if (isIgnoredFunctionArgument(node, parent, ignoreFunctionArguments))
          return;

        const scale = findScaleByUnit(primary, unit);

        if (isOnNumericScale(scale, absoluteValue)) return;

        const fix = () => {
          const closest = getClosest(scale, absoluteValue);
          mutateNumericValue(token, value >= 0 ? closest : -closest);
          setValue(decl, stringify([componentValues]));
        };

        report({
          ...getNumberIndices(decl, token),
          fix,
          message: messages.expected(absoluteValue, scale.join(", "), unit),
          node: decl,
          result,
          ruleName,
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
