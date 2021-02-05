# space

Specify scales for space.

```css
a {
  margin: 1rem;
}
/**       ↑
 *        This space */
```

This rule can automatically fix all of the problems reported.

This rule checks `<length>` and `<percentage>` values.

This rule can be paired with the [`declaration-property-unit-allowed-list`](https://stylelint.io/user-guide/rules/declaration-property-unit-allowed-list) rule in stylelint, using the RegEx:

```
/^inset|gap|^margin|^padding/
```

## Options

`array` of `objects` as `{scale: [], units: []}`

Negative spaces on the scale are implicitly allowed.

Given:

```json
[
  { "scale": [1, 2], "units": ["em", "rem"] },
  { "scale": [16, 32], "units": ["px"] }
]
```

The following patterns are considered violations:

```css
a {
  margin: 16rem;
}
```

```css
a {
  padding: 2px;
}
```

The following patterns are _not_ considered violations:

```css
a {
  margin: 1em;
}
```

```css
a {
  padding: 2rem;
}
```

```css
a {
  gap: -32px;
}
```
