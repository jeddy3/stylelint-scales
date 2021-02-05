# alpha-values

Specify a scale for alpha values.

```css
a {
  opacity: 10%;
}
/**        ↑
*          This alpha value */
```

This rule can automatically fix all of the problems reported.

This rule checks `<percentage>` alpha values.

This rule checks within color functions using modern syntax.

Modern color function syntax and `<percentage>` alpha values can be enforced, respectively, using the [`color-function-notation`](https://stylelint.io/user-guide/rules/color-function-notation) and [`alpha-value-notation`](https://stylelint.io/user-guide/rules/alpha-value-notation) rules in stylelint.

## Options

`array`

Given:

```json
[10, 20]
```

The following patterns are considered violations:

```css
a {
  opacity: 5%;
}
```

```css
a {
  color: hsl(0deg 0 0 / 25%);
}
```

```css
a {
  color: hsl(var(--accent) / 50%);
}
```

The following patterns are _not_ considered violations:

```css
a {
  opacity: 10%;
}
```

```css
a {
  color: hsl(0deg 0 0 / 20%);
}
```

```css
a {
  color: hsl(var(--accent) / 20%);
}
```
