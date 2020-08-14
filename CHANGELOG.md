# Changelog

# Unreleased

- Adds correct unit display in messages for all relevant rules.

# 1.3.0

## Changed

- Border width rule no longer checks against `none` value.
- Support non-numerical font-weights.
- Handles CSS global keywords in font shorthand declarations.

# 1.2.0

## Added

- `z-indices` rule
- `border-width` rule

## Changed

- added `unit` option on unit dependent scales

# 1.1.1

## Changed

- missing `sizes` documentation link

# 1.1.0

## Added

- `sizes` rule
- `font-family` rule
- `letter-spacing` rule
- `radii` rule
- `word-spacing` rule

# 1.0.0

## Removed

- `unit` secondary options from `scales/font-size` and `scales/space`

## Changed

- `scales/font-size` and `scales/space` now check all font-relative and absolute length values
- `scales/space` now checks the `margin`, `padding` and `grip-gap` longhand and shorthand properties, and no longer checks the `box-shadow` and `border` ones

## Fixed

- rationale in `README.md`
- plugin name in example in `README.md`

# 0.1.1

## Fixed

- documentation links in `package.json`

# 0.1.0

- Initial release
