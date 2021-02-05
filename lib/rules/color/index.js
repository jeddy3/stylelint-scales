const { isArray, isString } = require("lodash");
const { parse } = require("postcss-values-parser");
const {
  createPlugin,
  utils: { report, validateOptions },
} = require("stylelint");

const createRuleMessages = require("../../utils/createRuleMessages");

const ruleName = "scales/color";
const messages = createRuleMessages(ruleName);

// Rule accepts an array of arrays of rgb values for the scale
// And an array of alpha channels
const rule = (
  scale,
  options = {
    alphaScale: [],
  }
) => {
  return (root, result) => {
    // Validate the options
    const validOptions = validateOptions(
      result,
      ruleName,
      {
        actual: scale,
        possible: isArray,
      },
      {
        actual: options,
        possible: {
          alphaScale: [isString],
        },
      }
    );
    if (!validOptions) return;
    // Walk through all the declarations in the source
    root.walkDecls((decl) => {
      const { value } = decl;
      // Return early if no rgb(a) colours anywhere to avoid needlessly parsing decl value
      if (!value.includes("rgb")) return;
      // Parse the decl value and walk through Funcs
      parse(value, {
        ignoreUnknownWords: true,
      }).walkFuncs(({ isColor, name, nodes }) => {
        // Return early for non rgba colours
        if (!isColor || !["rgb", "rgba"].includes(name)) return;
        // Extract colour channels from nodes of function
        const channels = nodes
          .filter((channel) => channel.type === "numeric")
          .map((channel) => Number(channel.value));
        // Pop off the alpha channel if it exists
        let alphaChannel;
        if (channels.length === 4) alphaChannel = channels.pop();
        // Prepare default message
        let message = messages.expected(channels.join(","), scale.join(", "));
        // Return if not on the scale
        if (
          scale.some((item) => {
            // Do the non alpha channels match?
            if (item.every((value, index) => value === channels[index])) {
              // And are we dealing with a non alpha colour?
              if (!alphaChannel) return true;
              // If not, check the alpha scale too
              const { alphaScale } = options;
              if (alphaScale.includes(`${alphaChannel}`)) {
                return true;
              } else {
                message = messages.expected(
                  alphaChannel,
                  alphaScale.join(", ")
                );
              }
            }
            return false;
          })
        )
          return;
        // Report the violation to stylelint
        report({
          message,
          node: decl,
          result,
          ruleName,
          word: name,
        });
      });
    });
  };
};

rule.primaryOptionArray = true;
module.exports = createPlugin(ruleName, rule);
module.exports.ruleName = ruleName;
module.exports.messages = messages;
