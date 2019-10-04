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

Given:

```json
{
  "scale": [1, 1.5],
  "units": ["px", "rem"]
}
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

```css
a {
  font-size: 1em;
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

## Optional secondary options

### `units: array`

For example with `["px", "em"]`:

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

```css
a {
  font-size: 1em;
}
```
