# space

Specify a scale for space.

```css
a {
  margin: 1rem;
}
/**       ↑
 *        This size */
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
  margin: 2rem;
}
```

The following patterns are _not_ considered violations:

```css
a {
  margin: 1rem;
}
```

## Optional secondary options

### `unit: string` (default: `"rem"`)

For example with `"px"`:

The following patterns are considered violations:

```css
a {
  margin: 3px;
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
  margin: 3rem;
}
```
