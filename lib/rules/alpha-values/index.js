const { parse } = require("postcss-values-parser");
const {
  createPlugin,
  utils: { report, validateOptions },
} = require("stylelint");

const createRuleMessages = require("../../utils/createRuleMessages");
const getClosest = require("../../utils/getClosest");
const getValue = require("../../utils/getValue");
const hasNumericScale = require("../../utils/hasNumericScale");
const isOnNumericScale = require("../../utils/isOnNumericScale");
const setValue = require("../../utils/setValue");

const ruleName = "scales/alpha-values";
const messages = createRuleMessages(ruleName);

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
        const { value } = node;

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

module.exports = createPlugin(ruleName, rule);
module.exports.ruleName = ruleName;
module.exports.messages = messages;
