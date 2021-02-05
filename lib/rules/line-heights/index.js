const { parse } = require("postcss-values-parser");
const {
  createPlugin,
  utils: { report, validateOptions },
} = require("stylelint");

const createRuleMessages = require("../../utils/createRuleMessages");
const getClosest = require("../../utils/getClosest");
const getValue = require("../../utils/getValue");
const isOnNumericScale = require("../../utils/isOnNumericScale");
const setValue = require("../../utils/setValue");

const ruleName = "scales/line-heights";
const messages = createRuleMessages(ruleName);

const propertyFilter = /^line-height$|^font$/;

const rule = (primary, secondary, { fix }) => {
  return (root, result) => {
    if (
      !validateOptions(result, ruleName, {
        actual: primary,
        possible: Array.isArray,
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
    ({ type, value }) => type === "operator" && value === "/"
  );
  if (node) return node.next();
}

rule.primaryOptionArray = true;

module.exports = createPlugin(ruleName, rule);
module.exports.ruleName = ruleName;
module.exports.messages = messages;
