# space

Specify a scale for space.

```css
a {
  margin: 1rem;
}
/**       ↑
 *        This size */
```

This rule checks [font-relative](https://drafts.csswg.org/css-values-4/#font-relative-lengths), [viewport-percentage](https://drafts.csswg.org/css-values-4/#viewport-relative-lengths) and [absolute](https://drafts.csswg.org/css-values-4/#absolute-lengths) lengths.

## Options

`array`

Given:

```json
[16, 32]
```

The following patterns are considered violations:

```css
a {
  margin: 48rem;
}
```

```css
a {
  grid-gap: 128px;
}
```

The following patterns are _not_ considered violations:

```css
a {
  margin: 16rem;
}
```

```css
a {
  grid-gap: 32px;
}
```

## Optional secondary options

### `units: array`

For example with `["px", "em"]`:

The following pattern is considered a violation:

```css
a {
  margin: 16rem;
}
```

The following patterns are _not_ considered violations:

```css
a {
  grid-gap: 16px;
}
```

```css
a {
  padding: 32em;
}
```
