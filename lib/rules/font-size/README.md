# font-size

Specify a scale for font-sizes.

```css
a {
  font-size: 1rem;
}
/**          ↑
 *           This size */
```

This rule defaults to checking `rem` units.

## Options

`array`

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
  font: 2rem/1 serif;
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
  font: 1.5rem/1 serif;
}
```

## Optional secondary options

### `unit: string` (default: `"rem"`)

For example with `"px"`:

The following patterns are considered violations:

```css
a {
  font-size: 3px;
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
  font-size: 3rem;
}
```
