# sizes

Specify scales for sizes.

```css
a {
  width: 400px;
}
/**      ↑
 *       This size */
```

This rule can automatically fix all of the problems reported.

This rule checks `<length>` and `<percentage>` values.

This rule can be paired with the [`declaration-property-unit-allowed-list`](https://stylelint.io/user-guide/rules/declaration-property-unit-allowed-list) rule in stylelint, using the RegEx:

```
/^((min|max)-)?(height$|width$|block-size$|inline-size$)/
```

## Options

`array` of `objects` as `{scale: [], units: []}`

Given:

```json
[
  {
    "scale": [100, 150],
    "units": ["px"]
  }
]
```

The following patterns are considered violations:

```css
a {
  width: 125px;
}
```

```css
a {
  max-height: 200px;
}
```

The following patterns are _not_ considered violations:

```css
a {
  width: 100px;
}
```

```css
a {
  max-height: 150px;
}
```
