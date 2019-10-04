# letter-spacing

Specify a scale for letter-spacing.

```css
a {
  letter-spacing: 0.1rem;
}
/**               ↑
 *                This size */
```

This rule checks [font-relative](https://drafts.csswg.org/css-values-4/#font-relative-lengths) and [absolute](https://drafts.csswg.org/css-values-4/#absolute-lengths) lengths.

## Options

`array`

Given:

```json
{
  "scale": [0.1, 0.2],
  "units": ["px", "rem"]
}
```

The following patterns are considered violations:

```css
a {
  letter-spacing: 0.5rem;
}
```

The following patterns are _not_ considered violations:

```css
a {
  letter-spacing: 0.1rem;
}

a {
  letter-spacing: 0.2px;
}
```

## Optional secondary options

### `units: array`

For example with `["px", "em"]`:

The following pattern is considered a violation:

```css
a {
  letter-spacing: 0.2rem;
}
```

The following patterns are _not_ considered violations:

```css
a {
  letter-spacing: 0.2px;
}
```

```css
a {
  letter-spacing: 0.2em;
}
```
