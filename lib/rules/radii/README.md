# radii

Specify a scale for radii.

```css
a {
  border-radius: 4px;
}
/**              ↑
 *               This size */
```

This rule checks [font-relative](https://drafts.csswg.org/css-values-4/#font-relative-lengths) and [absolute](https://drafts.csswg.org/css-values-4/#absolute-lengths) lengths.

## Options

`array`

Given:

```json
[4, 8]
```

The following patterns are considered violations:

```css
a {
  border-radius: 2px;
}
```

The following patterns are _not_ considered violations:

```css
a {
  border-top-right-radius: 4px;
}
```

## Optional secondary options

### `units: array`

For example with `["px", "em"]`:

The following pattern is considered a violation:

```css
a {
  border-top-right-radius: 4rem;
}
```

The following patterns are _not_ considered violations:

```css
a {
  border-top-right-radius: 4px;
}
```

```css
a {
  border-top-right-radius: 4em;
}
```
