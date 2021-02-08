# line-heights

Specify a scale for line heights.

```css
a {
  line-height: 1;
}
/**            ↑
 *             This line-height */
```

This rule can automatically fix all of the problems reported.

This rule checks unitless line heights.

This rule can be paired with the [`declaration-property-unit-allowed-list`](https://stylelint.io/user-guide/rules/declaration-property-unit-allowed-list) rule in stylelint.

## Options

`array`

Given:

```json
[1, 1.5]
```

The following patterns are considered violations:

```css
a {
  line-height: 2;
}
```

```css
a {
  font: 2rem/3 serif;
}
```

The following patterns are _not_ considered violations:

```css
a {
  line-height: 1;
}
```

```css
a {
  font: 2rem/1.5 serif;
}
```
