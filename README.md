# stylelint-scales

[![NPM version](https://img.shields.io/npm/v//stylelint-scales.svg)](https://www.npmjs.com/package//stylelint-scales) [![Actions Status](https://github.com/signal-noise/stylelint-scales/workflows/node-ci/badge.svg)](https://github.com/signal-noise/stylelint-scales/actions) [![NPM Downloads](https://img.shields.io/npm/dm//stylelint-scales.svg)](https://npmcharts.com/compare//stylelint-scales?minimal=true)

A [Stylelint](https://stylelint.io) plugin pack to enforce numeric scales.

## Installation

```
npm install stylelint-scales --save-dev
```

## Usage

Add `stylelint-scales` to your Stylelint config `plugins` array, then add the rules you need to the rules list. All rules from `stylelint-scales` need to be namespaced with `scales`.

Like so:

```json
{
  "plugins": ["stylelint-scales"],
  "rules": {
    "scales/alpha-values": [80, 90],
    "scales/border-widths": [{ "scale": [1, 2], "units": ["px"] }],
    "scales/font-sizes": [
      [
        { "scale": [1, 1.5, 2], "units": ["em", "rem"] },
        { "scale": [12, 14, 16], "units": ["px"] }
      ],
      {
        "ignoreFunctionArguments": {
          "clamp": [1]
        }
      }
    ],
    "scales/font-weights": [400, 600],
    "scales/line-heights": [1, 1.5],
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
  font-size: clamp(1rem, 0.23rem + 1.5vw, 12px);
  font-weight: 400;
  line-height: 1.5;
  margin-block: 2rem;
}
```

This plugin can automatically fix all the scales.

## List of rules

- [`alpha-values`](./lib/rules/alpha-values/README.md): Specify a scale for alpha values (Autofixable).
- [`border-widths`](./lib/rules/border-widths/README.md): Specify a scale for border widths (Autofixable).
- [`font-sizes`](./lib/rules/font-sizes/README.md): Specify a scale for font sizes (Autofixable).
- [`font-weights`](./lib/rules/font-weights/README.md): Specify a scale for font weights (Autofixable).
- [`letter-spacings`](./lib/rules/letter-spacings/README.md): Specify a scale for letter spacings (Autofixable).
- [`line-heights`](./lib/rules/line-heights/README.md): Specify a scale for line heights (Autofixable).
- [`radii`](./lib/rules/radii/README.md): Specify a scale for radii (Autofixable).
- [`sizes`](./lib/rules/sizes/README.md): Specify a scale for sizes (Autofixable).
- [`space`](./lib/rules/space/README.md): Specify a scale for space (Autofixable).
- [`word-spacings`](./lib/rules/word-spacings/README.md): Specify a scale for word spacings (Autofixable).
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

1. **Avoid the cognitive load of abstracted variable names**. Colours benefit from human-readable names, whereas it's typically easier to work directly with numeric values. If you use a numeric value that isn't on the scale, the plugin will automatically fix it.
2. **Enforce code and design consistency with one mechanism**. You likely already use Stylelint for code consistency, for example using the [`unit-allowed-list`](https://stylelint.io/user-guide/rules/unit-allowed-list) to enforce consistent units. By using this plugin, you avoid adding a second mechanism (variables) to ensure design consistency for numeric values.
3. **Can use the same approach across projects**. The plugin is agnostic of the styling technology, whether that's styled-components, SCSS or vanilla CSS.
4. **Remove the need to translate values from design tools into variables**. You can copy and paste code from design tools like Figma and Sketch without alteration.

## License

[The MIT License](LICENSE).
