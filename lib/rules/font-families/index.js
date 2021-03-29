const cssGlobalKeywords = require("css-global-keywords");

const {
  createPlugin,
  utils: { report, validateOptions },
} = require("stylelint");
const { parse: parseFontFamily } = require("font-family");

const createRuleMessages = require("../../utils/createRuleMessages");
const hasStringScale = require("../../utils/hasStringScale");
const parseShorthandFont = require("../../utils/parseShorthandFont");

const ruleName = "scales/font-families";
const messages = createRuleMessages(ruleName);

// Rule accepts an array of numbers for the scale
const rule = (scale) => {
  return (root, result) => {
    // Validate the options
    const validOptions = validateOptions(result, ruleName, {
      actual: scale,
      possible: hasStringScale,
    });
    if (!validOptions) return;
    // Walk through both font-family and font declarations in the source
    // And extract the family from the shorthand
    // Then check each font-family found
    root.walkDecls("font-family", (decl) => {
      if (decl.value.includes("var(")) return;
      const values = parseFontFamily(decl.value);
      values.forEach((value) => check(decl, value));
    });
    root.walkDecls("font", (decl) => {
      const { value } = decl;
      if (value.includes("var(")) return;
      if (cssGlobalKeywords.includes(value)) {
        check(decl, value);
      } else {
        const { family } = parseShorthandFont(value, result, decl);
        if (!Array.isArray(family)) return;
        family.forEach((value) => check(decl, value));
      }
    });
    // Check the font family
    function check(decl, family) {
      // Return early if the font family is on the scale or value is inherit
      if ([...scale, ...cssGlobalKeywords].includes(family)) return;
      // Get message of the violation
      const message = messages.expected(`${family}`, scale.join(", "));
      // Report the violation to stylelint
      report({
        message,
        node: decl,
        result,
        ruleName,
        word: family,
      });
    }
  };
};

rule.primaryOptionArray = true;
module.exports = createPlugin(ruleName, rule);
module.exports.ruleName = ruleName;
module.exports.messages = messages;
