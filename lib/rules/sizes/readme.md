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
[100, 150]
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
