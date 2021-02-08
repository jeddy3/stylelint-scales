# letter-spacings

Specify scales for letter spacing.

```css
a {
  letter-spacing: 0.1rem;
}
/**               ↑
 *                This letter spacing */
```

This rule can automatically fix all of the problems reported.

This rule checks `<length>` values.

This rule can be paired with the [`declaration-property-unit-allowed-list`](https://stylelint.io/user-guide/rules/declaration-property-unit-allowed-list) rule in stylelint.

## Options

`array` of `objects` as `{scale: [], units: []}`

Given:

```json
{
  "scale": [0.1, 0.2],
  "units": ["rem"]
}
```

The following patterns are considered violations:

```css
a {
  letter-spacing: 0.5rem;
}
```

The following patterns are _not_ considered violations:

```css
a {
  letter-spacing: 0.1rem;
}

a {
  letter-spacing: 0.2rem;
}
```
