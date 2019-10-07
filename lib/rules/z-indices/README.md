# z-indices

Specify a scale for z-indices.

```css
a {
  z-index: 1;
}
/**        ↑
 *         This z-order */
```

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
