import { stringify } from "@csstools/css-parser-algorithms";
import stylelint from "stylelint";

import createRuleMessages from "../../utils/createRuleMessages.js";
import findScaleByUnit from "../../utils/findScaleByUnit.js";
import getClosest from "../../utils/getClosest.js";
import getNumberIndices from "../../utils/getNumberIndices.js";
import getUnit from "../../utils/getUnit.js";
import getValue from "../../utils/getValue.js";
import hasScalesWithUnits from "../../utils/hasScalesWithUnits.js";
import isOnNumericScale from "../../utils/isOnNumericScale.js";
import mutateNumericValue from "../../utils/mutateNumericValue.js";
import parseValue from "../../utils/parseValue.js";
import setValue from "../../utils/setValue.js";
import walkNumerics from "../../utils/walkNumerics.js";

const {
  createPlugin,
  utils: { report, validateOptions },
} = stylelint;

const ruleName = "scales/radii";
const messages = createRuleMessages(ruleName);
const meta = {
  url: "https://github.com/jeddy3/stylelint-scales/blob/main/lib/rules/radii/README.md",
  fixable: true,
};

const propertyFilter = /radius$/;

const rule = (primary) => {
  return (root, result) => {
    if (
      !validateOptions(result, ruleName, {
        actual: primary,
        possible: hasScalesWithUnits,
      })
    )
      return;

    root.walkDecls(propertyFilter, (decl) => {
      const value = getValue(decl);

      const componentValues = parseValue(value);

      walkNumerics(componentValues, check);

      function check(node) {
        const token = node.value;
        const { value } = token[4];
        const unit = getUnit(token);

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

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

export default createPlugin(ruleName, rule);
