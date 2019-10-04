# sizes

Specify a scale for (min-, max-) width and height.

```css
a {
  width: 400px;
}
/**      ↑
 *       This size */
```

This rule checks [font-relative](https://drafts.csswg.org/css-values-4/#font-relative-lengths), [viewport-percentage](https://drafts.csswg.org/css-values-4/#viewport-relative-lengths) and [absolute](https://drafts.csswg.org/css-values-4/#absolute-lengths) lengths.

## Options

`array`

Given:

```json
{
  "scale": [100, 150],
  "units": ["px", "vw"]
}
```

The following patterns are considered violations:

```css
a {
  max-width: 125px;
}
```

```css
a {
  height: 200rem;
}
```

The following patterns are _not_ considered violations:

```css
a {
  width: 100vw;
}
```

```css
a {
  min-height: 150px;
}
```

## Optional secondary options

### `units: array`

For example with `["px", "em"]`:

The following pattern is considered a violation:

```css
a {
  width: 100vw;
}
```

The following patterns are _not_ considered violations:

```css
a {
  min-height: 150px;
}
```

```css
a {
  max-height: 150em;
}
```
