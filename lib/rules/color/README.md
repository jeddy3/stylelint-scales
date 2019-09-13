# color

Specify a scale for colors.

```css
a {
  color: rgb(0, 0, 0);
}
/**          ↑
 *           This color */
```

This rule assumes rgb(a) colors.

## Options

`array`

Given:

```json
[[0, 0, 0], [255, 255, 255]]
```

The following patterns are considered violations:

```css
a {
  color: rgb(1, 1, 1);
}
```

```css
a {
  background-color: rgb(2, 2, 2);
}
```

The following patterns are _not_ considered violations:

```css
a {
  color: rgb(0, 0, 0);
}
```

```css
a {
  background-color: rgb(255, 255, 255);
}
```

## Optional secondary options

### `alphaScale: array`

For example with `[0.5, 0.75]`:

The following pattern is considered a violation:

```css
a {
  color: rgba(0, 0, 0, 0.1);
}
```

The following patterns are _not_ considered violations:

```css
a {
  color: rgba(0, 0, 0, 0.5);
}
```

```css
a {
  background-color: rgba(0, 0, 0, 0.75);
}
```
