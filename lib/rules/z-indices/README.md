# z-indices

Specify a scale for z-indices.

```css
a {
  z-index: 1;
}
/**        ↑
 *         This z-index */
```

This rule can automatically fix all of the problems reported.

## Options

`array`

Given:

```json
[1, 2]
```

The following patterns are considered violations:

```css
a {
  z-index: 35;
}
```

The following patterns are _not_ considered violations:

```css
a {
  z-index: 1;
}
```
