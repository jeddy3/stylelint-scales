# font-weight

Specify a scale for font-weights.

```css
a {
  font-weight: 400;
}
/**            ↑
 *             This weight */
```

This rule can automatically fix all of the problems reported.

This rule checks numeric font-weights.

Numeric font-weights can be enforced using the [`font-weight-notation`](https://stylelint.io/user-guide/rules/font-weight-notation) rule in stylelint.

## Options

`array`

Given:

```json
[400, 700]
```

The following patterns are considered violations:

```css
a {
  font-weight: 300;
}
```

```css
a {
  font: 900 1rem/1 serif;
}
```

The following patterns are _not_ considered violations:

```css
a {
  font-weight: 400;
}
```

```css
a {
  font: 700 1rem/1 serif;
}
```
