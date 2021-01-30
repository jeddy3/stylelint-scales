# Changelog

# Unreleased

## Changed

- rules now check logical properties and shorthand gap

## Added

- support for per unit scales to `font-size` and `space`
- support for unenclosed array primary options

# 1.5.0

## Removed

- support for Node 8

# 1.4.0

## Added

- unit display in messages for all relevant rules

# 1.3.0

## Added

- support non-numerical font-weights

## Fixed

- false positives for CSS global keywords in font shorthand declarations
- `border-width` false positives for `none` value

# 1.2.0

## Added

- `z-indices` rule
- `border-width` rule
- `unit` option on unit dependent scales

# 1.1.1

## Fixed

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

- initial release
