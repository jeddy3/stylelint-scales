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
import isLineHeight from "../../utils/isLineHeight.js";
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

      const componentValues = parseValue(value);

      switch (prop) {
        case "font": {
          const node = findFontSize(componentValues);
          if (node) check(node);
          break;
        }
        case "font-size":
          walkNumerics(componentValues, check);
          break;
      }

      function check(node, parent) {
        const token = node.value;
        const { value } = token[4];
        const unit = getUnit(token);

        if (isIgnoredFunctionArgument(node, parent, ignoreFunctionArguments))
          return;

        const scale = findScaleByUnit(primary, unit);

        if (isOnNumericScale(scale, value)) return;

        const fix = () => {
          mutateNumericValue(token, getClosest(scale, value));
          setValue(decl, stringify([componentValues]));
        };

        report({
          ...getNumberIndices(decl, token),
          fix,
          message: messages.expected(value, scale.join(", "), unit),
          node: decl,
          result,
          ruleName,
        });
      }
    });
  };
};

function findFontSize(nodes) {
  const node = nodes.find(
    (candidate) => isNumeric(candidate) && getUnit(candidate.value) !== "",
  );

  if (node && !isLineHeight(nodes, node)) return node;
}

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

export default createPlugin(ruleName, rule);
