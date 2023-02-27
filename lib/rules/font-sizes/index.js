const { parse } = require("postcss-values-parser");
const {
  createPlugin,
  utils: { report, validateOptions },
} = require("stylelint");

const createRuleMessages = require("../../utils/createRuleMessages");
const findScaleByUnit = require("../../utils/findScaleByUnit");
const getClosest = require("../../utils/getClosest");
const getValue = require("../../utils/getValue");
const hasScalesWithUnits = require("../../utils/hasScalesWithUnits");
const hasObjectWithNumericArray = require("../../utils/hasObjectWithNumericArray");
const isLineHeight = require("../../utils/isLineHeight");
const isOnNumericScale = require("../../utils/isOnNumericScale");
const setValue = require("../../utils/setValue");

const ruleName = "scales/font-sizes";
const messages = createRuleMessages(ruleName);

const propertyFilter = /^font-size$|^font$/;

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
        }
      )
    )
      return;

    const ignoreFunctionArguments = secondary?.ignoreFunctionArguments;

    root.walkDecls(propertyFilter, (decl) => {
      const { prop } = decl;
      const value = getValue(decl);
      let hasFix = false;

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

        if (fix) {
          node.value = getClosest(scale, value);
          hasFix = true;
          return;
        }

        report({
          message: messages.expected(value, scale.join(", "), unit),
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

function findFontSize(nodes) {
  const node = nodes.find(
    ({ type, unit }) => type === "numeric" && unit !== ""
  );

  if (node && !isLineHeight(node)) return node;
}

function isIgnoredFunctionArgument(node, ignoreFunctionArguments) {
  if (ignoreFunctionArguments && node?.parent?.type === "func") {
    const { parent } = node;
    const { name, nodes } = parent;
    const ignoredArgs = ignoreFunctionArguments[name];
    const args = getArgs(nodes);

    if (
      ignoredArgs &&
      ignoredArgs.some((arg) => args[arg].some((n) => n === node))
    )
      return true;
  }

  return false;
}

function getArgs(nodes) {
  const args = [];
  let numerics = [];
  for (const node of nodes) {
    if (node.type === "punctuation" && node.value === ",") {
      args.push(numerics);
      numerics = [];
    } else {
      numerics.push(node);
    }
  }
  args.push(numerics);
  return args;
}

rule.primaryOptionArray = true;

module.exports = createPlugin(ruleName, rule);
module.exports.ruleName = ruleName;
module.exports.messages = messages;
