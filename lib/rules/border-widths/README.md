# border-widths

Specify scales for border widths.

```css
a {
  border-width: 0.1rem;
}
/**               ↑
 *                This width */
```

This rule can automatically fix all of the problems reported.

This rule checks `<length>` values.

This rule can be paired with the [`declaration-property-unit-allowed-list`](https://stylelint.io/user-guide/rules/declaration-property-unit-allowed-list) rule in stylelint, using the RegEx:

```
/^border$|^border.*(width$|top$|right$|bottom$|left$/
```

## Options

`array` of `objects` as `{scale: [], units: []}`

Given:

```json
[{ "scale": [1, 2], "units": ["px"] }]
```

The following patterns are considered violations:

```css
a {
  border-width: 3px;
}
```

```css
a {
  border: 3px solid red;
}
```

The following patterns are _not_ considered violations:

```css
a {
  border-width: 1px;
}
```

```css
a {
  border: 2px solid red;
}
```
