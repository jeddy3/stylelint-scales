# font-size

Specify a scale for font-sizes.

```css
a {
  font-size: 1rem;
}
/**          ↑
 *           This size */
```

This rule checks [font-relative](https://drafts.csswg.org/css-values-4/#font-relative-lengths) and [absolute](https://drafts.csswg.org/css-values-4/#absolute-lengths) lengths.

## Options

`array`

Array of numbers or an array of objects as `{units: [], scale: []}`

Given:

```json
[1, 1.5]
```

The following patterns are considered violations:

```css
a {
  font-size: 2rem;
}
```

```css
a {
  font: 2px/1 serif;
}
```

The following patterns are _not_ considered violations:

```css
a {
  font-size: 1rem;
}
```

```css
a {
  font: 1.5px/1 serif;
}
```

Given:

```json
[
  { "units": ["em", "rem"], "scale": [1, 2] },
  { "units": ["px"], "scale": [16, 32] }
]
```

The following patterns are considered violations:

```css
a {
  font-size: 16rem;
}
```

```css
a {
  font: 2px/1 serif;
}
```

The following patterns are _not_ considered violations:

```css
a {
  font-size: 1rem;
}
```

```css
a {
  font: 16px/1 serif;
}
```

## Optional secondary options

### `unit: string`

For example with `"px"`:

The following pattern is considered a violation:

```css
a {
  font-size: 1rem;
}
```

The following patterns are _not_ considered violations:

```css
a {
  font-size: 1px;
}
```
