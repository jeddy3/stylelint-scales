# radii

Specify scales for radii.

```css
a {
  border-radius: 2px;
}
/**              ↑
 *               This radius */
```

This rule can automatically fix all of the problems reported.

This rule checks `<length>` and `<percentage>` values.

This rule can be paired with the [`declaration-property-unit-allowed-list`](https://stylelint.io/user-guide/rules/declaration-property-unit-allowed-list) rule in stylelint, using the RegEx:

```
/radius$/
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
  border-radius: 4px;
}
```

The following patterns are _not_ considered violations:

```css
a {
  border-top-right-radius: 2px;
}
```
