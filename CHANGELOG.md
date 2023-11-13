# Changelog

## Head

### Fixed

- `alpha-values` false positives for `<number>`

## 3.1.0

### Added

- `ignoreFunctionArguments: []` option to `space` rule

## 3.0.0

### Migrating from 2.0.3

The package name as been unscoped to `stylelint-scales` and the scoped package has been deprecated.

You should replace the deprecated package:

```
npm uninstall @signal-noise/stylelint-scales && npm i -D stylelint-scales
```

```diff json
{
- "plugins": ["@signal-noise/stylelint-scales"],
+ "plugins": ["stylelint-scales"],
  "rules": {
    "scales/alpha-values": [80, 90]
    ..
  }
}
```

The `font-families` rule has been removed so that the pack is for autofixable numeric scales. You should remove the rule from your config:

```diff json
{
  "rules": {
-   "scales/font-families": ["sans-serif", "serif"]
    ..
  }
}
```

### Removed

- `font-families` rule

### Changed

- Unscoped the package name to `stylelint-scales`

### Added

- `ignoreFunctionArguments: []` option to `font-sizes` rule

## 2.0.3

### Fixed

- `stylelint@14` compatibility

## 2.0.2

### Fixed

- type error for system keywords in `font-families`

## 2.0.1

### Fixed

- parse error for custom properties in `font-families`

## 2.0.0

### Migrating from 1.5.0

The plugin pack can now automatically fix all numeric scales!

A number of breaking changes were needed to make this possible.

#### Rule names

A handful of rules were renamed to consistently use plurals:

- `border-width` to `border-widths`
- `font-family` to `font-families`
- `font-size` to `font-sizes`
- `font-weight` to `font-weights`
- `letter-spacing` to `letter-spacings`
- `line-height` to `line-heights`
- `word-spacing` to `word-spacings`

For example, you should change the following:

```json
{
  "rules": {
    "scales/font-weight": [400, 600]
  }
}
```

To:

```json
{
  "rules": {
    "scales/font-weights": [400, 600]
  }
}
```

#### Option signatures

Rules that check values with units now expect an array of objects for their primary option. Each object must specify two arrays:

- `scale` - a numerical scale of allowed values
- `units` - a list of units to apply the scale to

This replaces the `unit` secondary option found on many of the rules.

For example, you should change the following:

```json
{
  "rules": {
    "scales/font-size": [[1, 2], { "unit": "rem" }]
  }
}
```

To:

```json
{
  "rules": {
    "scales/font-sizes": [
      {
        "scale": [1, 2],
        "units": ["rem"]
      }
    ]
  }
}
```

This will allow:

```css
a {
  font-size: 1rem;
}
```

You can now specify multiple units per scale, for example:

```json
{
  "rules": {
    "scales/font-sizes": [
      {
        "scale": [1, 2],
        "units": ["em", "rem"]
      }
    ]
  }
}
```

This will allow:

```css
a {
  font-size: 1em;
}

a {
  font-size: 1rem;
}
```

And multiple scales per rule, for example:

```json
{
  "rules": {
    "scales/font-sizes": [
      {
        "scale": [1, 2],
        "units": ["rem"]
      },
      {
        "scale": [12, 14],
        "units": ["px"]
      }
    ]
  }
}
```

This will allow:

```css
a {
  font-size: 1rem;
}

a {
  font-size: 12px;
}
```

#### Enforcing specific units

The plugin pack no longer enforces the specified units. This is particularly useful when working with percentages and viewport units, which may not sit on a scale. You should use the [declaration-property-unit-allowed-list rule](https://stylelint.io/user-guide/rules/declaration-property-unit-allowed-list) in stylelint if you wish to enforce specific units.

For example, you should change the following:

```json
{
  "rules": {
    "scales/font-size": [[1, 2], { "unit": "rem" }]
  }
}
```

To:

```json
{
  "rules": {
    "declaration-property-unit-allowed-list": {
      "/^font$|^font-size$/": ["rem"]
    },
    "scales/font-sizes": [
      {
        "scale": [1, 2],
        "units": ["rem"]
      }
    ]
  }
}
```

Appropriate regular expressions for the [declaration-property-unit-allowed-list rule](https://stylelint.io/user-guide/rules/declaration-property-unit-allowed-list) are documented in each of the rule READMEs.

#### Only numeric values

The rules now, with the exception of `font-families`, only accept numeric values. Non-numeric values in your CSS are now ignored.

For example, you should change the following:

```json
{
  "rules": {
    "scales/font-weight": [400, 600, "bold"]
  }
}
```

To:

```json
{
  "rules": {
    "scales/font-weights": [400, 600]
  }
}
```

Numeric font weights are appropriate for both non-variable fonts, e.g. 100, 200, 300 and so on, and [variable fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide), which range from 1 to 1000.

#### Logical and gap properties

The rules now check [logical properties](https://drafts.csswg.org/css-logical-1/) and [gap properties](https://drafts.csswg.org/css-align-3/#gaps), so more violations may be caught (and automatically fixed).

#### Top-level arrays

You no longer need to enclose top-level scale arrays in an array.

For example, you should change the following:

```json
{
  "rules": {
    "scales/font-weight": [[400, 600]]
  }
}
```

To:

```json
{
  "rules": {
    "scales/font-weights": [400, 600]
  }
}
```

#### The `color` rule

The `color` rule was removed. You should use CSS Variables for colours because, unlike numeric values and font family names, hex values and colour function notation are not human-readable. You can enforce a scale for alpha values using the new `alpha-values` rule.

For example, you should change the following:

```json
{
  "rules": {
    "scales/color": [
      [
        [0, 0, 0],
        [255, 255, 255]
      ],
      {
        "alphaScale": [[0.5, 0.75]]
      }
    ]
  }
}
```

To:

```json
{
  "rules": {
    "scales/alpha-values": [50, 75]
  }
}
```

And write your CSS using CSS Variables for colour, for example:

```css
a {
  color: hsl(var(--accent) / 50%);
}
```

### Removed

- `color` rule

### Changed

- names to be consistently pluralised
- options signature for rules that check values with units
- rules now check logical properties and shorthand gap

### Added

- `alpha-values` rule
- autofix to rules that check numeric scales
- per unit scales for rules that check values with units
- support for unenclosed array primary options

## 1.5.0

### Removed

- support for Node 8

## 1.4.0

### Added

- unit display in messages for all relevant rules

## 1.3.0

### Added

- support non-numerical font-weights

### Fixed

- false positives for CSS global keywords in font shorthand declarations
- `border-width` false positives for `none` value

## 1.2.0

### Added

- `z-indices` rule
- `border-width` rule
- `unit` option on unit dependent scales

## 1.1.1

### Fixed

- missing `sizes` documentation link

## 1.1.0

### Added

- `sizes` rule
- `font-family` rule
- `letter-spacing` rule
- `radii` rule
- `word-spacing` rule

## 1.0.0

### Removed

- `unit` secondary options from `scales/font-size` and `scales/space`

### Changed

- `scales/font-size` and `scales/space` now check all font-relative and absolute length values
- `scales/space` now checks the `margin`, `padding` and `grip-gap` longhand and shorthand properties, and no longer checks the `box-shadow` and `border` ones

### Fixed

- rationale in `README.md`
- plugin name in example in `README.md`

## 0.1.1

### Fixed

- documentation links in `package.json`

## 0.1.0

- initial release
