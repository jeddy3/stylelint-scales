# stylelint-scales

[![NPM version](https://img.shields.io/npm/v/@signal-noise/stylelint-scales.svg)](https://www.npmjs.com/package/@signal-noise/stylelint-scales) [![Actions Status](https://github.com/signal-noise/stylelint-scales/workflows/node-ci/badge.svg)](https://github.com/signal-noise/stylelint-scales/actions) [![NPM Downloads](https://img.shields.io/npm/dm/@signal-noise/stylelint-scales.svg)](https://npmcharts.com/compare/@signal-noise/stylelint-scales?minimal=true)

A [stylelint](https://stylelint.io) plugin pack of rules for enforcing scales.

## Installation

```
npm install @signal-noise/stylelint-scales --save-dev
```

## Usage

Add `stylelint-scales` to your stylelint config plugins array, then add the rules you need to the rules list. All rules from `stylelint-scales` need to be namespaced with `scales`.

Like so:

```json
{
  "plugins": ["@signal-noise/stylelint-scales"],
  "rules": {
    "scales/alpha-values": [80, 90],
    "scales/border-width": [{ "scale": [1, 2], "units": ["px"] }],
    "scale/font-family": ["system-ui"],
    "scales/font-size": [
      { "scale": [1, 1.5, 2], "units": ["em", "rem"] },
      { "scale": [12, 14, 16], "units": ["px"] }
    ],
    "scales/font-weight": [400, 600],
    "scales/line-height": [1, 1.5],
    "scales/radii": [{ "scale": [2, 4], "units": ["px"] }],
    "scales/space": [{ "scale": [0.5, 1, 2, 4], "units": ["rem"] }]
  }
}
```

To enforce this:

```css
p {
  border: 1px solid hsl(var(--accent) / 90%));
  border-radius: 2px;
  font: 400 1rem/1.5 system-ui;
  margin-block: 2rem;
}
```

This plugin can automatically fix all the numeric scales.

## List of rules

- [`alpha-values`](./lib/rules/alpha-values/README.md): Specify a scale for alpha values (Autofixable).
- [`border-width`](./lib/rules/border-width/README.md): Specify a scale for border-width (Autofixable).
- [`color`](./lib/rules/color/README.md): Specify a scale for color.
- [`font-family`](./lib/rules/font-family/README.md): Specify a scale for font-family.
- [`font-size`](./lib/rules/font-size/README.md): Specify a scale for font-size (Autofixable).
- [`font-weight`](./lib/rules/font-weight/README.md): Specify a scale for font-weight (Autofixable).
- [`letter-spacing`](./lib/rules/letter-spacing/README.md): Specify a scale for letter-spacing (Autofixable).
- [`line-height`](./lib/rules/line-height/README.md): Specify a scale for line-height (Autofixable).
- [`radii`](./lib/rules/radii/README.md): Specify a scale for radii (Autofixable).
- [`sizes`](./lib/rules/sizes/README.md): Specify a scale for sizes (Autofixable).
- [`space`](./lib/rules/space/README.md): Specify a scale for space (Autofixable).
- [`word-spacing`](./lib/rules/word-spacing/README.md): Specify a scale for word-spacing (Autofixable).
- [`z-indices`](./lib/rules/z-indices/README.md): Specify a scale for z-indices (Autofixable).

Ref: [Styled System Keys Reference](https://styled-system.com/theme-specification#key-reference)

You and the designers should define the scales together. You'll want to strike a balance between code consistency and design flexibility.

## Why?

This plugin can help you create:

- a consistent look and feel for your websites
- efficient collaboration between you and the designers

When designers review websites in the browser, they generally use relative terms. For example, "The space between that heading and that paragraph feels too tight, can we make it bigger?"

You can then pick the next value on the scale and be confident that it'll be consistent with the overall design.

### Why not use variables?

While you can achieve something similar with variables, with this plugin you:

1. **Enforce code and design consistency with one mechanism**. You probably already use stylelint for code consistency, for example using the [`unit-allowed-list`](https://stylelint.io/user-guide/rules/unit-allowed-list) to enforce consistent units. By using this plugin, you avoid adding a second mechanism (variables) to ensure design consistency. Additionally, you'll need to enforce the use of variables with linting anyway to avoid relying on developer discipline.
2. **Avoid the cognitive load of abstracted variable names**. You can write explicit values, and the plugin will automatically fix it to the closest value on the corresponding scale.
3. **Can use the same approach across projects**. The plugin is agnostic of the styling technology, whether that's styled-components, SCSS or vanilla CSS.
4. **Remove the need to translate values from design tools into variables**. You can copy and paste code from design tools like Figma and Sketch without alteration.
