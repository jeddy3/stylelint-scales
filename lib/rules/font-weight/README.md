# font-weight

Specify a scale for font-weights.

```css
a {
  font-weight: 400;
}
/**            ↑
 *             This weight */
```

This rule assumes numeric font-weights.

## Options

`array`

Given:

```json
[400, 700, "bold"]
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
  font-weight: bold;
}
```

```css
a {
  font: 700 1rem/1 serif;
}
```
