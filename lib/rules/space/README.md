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
[1, 1.5]
```

The following patterns are considered violations:

```css
a {
  margin: 2rem;
}
```

```css
a {
  grid-gap: 2px;
}
```

The following patterns are _not_ considered violations:

```css
a {
  margin: 1rem;
}
```

```css
a {
  grid-gap: 1px;
}
```
