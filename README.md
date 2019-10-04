# stylelint-scales

[![NPM version](https://img.shields.io/npm/v/@signal-noise/stylelint-scales.svg)](https://www.npmjs.com/package/@signal-noise/stylelint-scales) [![Actions Status](https://github.com/signal-noise/stylelint-scales/workflows/node-ci/badge.svg)](https://github.com/signal-noise/stylelint-scales/actions) [![NPM Downloads](https://img.shields.io/npm/dm/@signal-noise/stylelint-scales.svg)](https://npmcharts.com/compare/@signal-noise/stylelint-scales?minimal=true)

A plugin pack of scale related linting rules for [stylelint](https://stylelint.io).

## Installation

```
npm install @signal-noise/stylelint-scales --save-dev
```

## Usage

Add `stylelint-scales` to your stylelint config plugins array, then add rules you need to the rules list. All rules from `stylelint-scales` need to be namespaced with `scales`.

Like so:

```js
// .stylelintrc
{
  "plugins": ["@signal-noise/stylelint-scales"],
  "rules": {
    "scales/font-size": [1, 1.5, 2],
  }
}
```

## List of rules

- [`color`](./lib/rules/color/README.md): Specify a scale for color.
- [`font-family`](./lib/rules/font-family/README.md): Specify a scale for font-family.
- [`font-size`](./lib/rules/font-size/README.md): Specify a scale for font-size.
- [`font-weight`](./lib/rules/font-weight/README.md): Specify a scale for font-weight.
- [`letter-spacing`](./lib/rules/letter-spacing/README.md): Specify a scale for letter-spacing.
- [`line-height`](./lib/rules/line-height/README.md): Specify a scale for line-height.
- [`radii`](./lib/rules/radii/README.md): Specify a scale for radii.
- [`space`](./lib/rules/space/README.md): Specify a scale for space.
- [`word-spacing`](./lib/rules/word-spacing/README.md): Specify a scale for word-spacing.

Ref: [Styled System Keys Reference](https://styled-system.com/theme-specification#key-reference)

You and the designers should define the scales together. You'll want to strike a balance between code consistency and design flexibility.

# Why?

This plugin can help you create:

- a consistent look and feel for your apps
- efficient collaboration between you and the designers

When designers review apps in the browser they generally use relative terms. For example, "The space between that heading and that paragraph feels too tight, can we make it bigger?"

You can then pick the next value on the scale and be confident that it'll be consistent with the overall design.

## Why not use variables?

While you can achieve something similar with variables, with this plugin you:

1. remove the need to translate values from design tools into variables. You can copy and paste code from design tools like Zeplin without alteration.
2. can use it across projects that use styled-components, SCSS or vanilla CSS. It is agnostic of the styling technology.
3. enforce code and design consistency with one mechanism. You probably already use stylelint for code consistency, for example using the [`unit-whitelist`](https://stylelint.io/user-guide/rules/unit-whitelist) to enforce consistent units. By using this plugin you avoid adding a second mechanism (variables) to ensure design consistency.
