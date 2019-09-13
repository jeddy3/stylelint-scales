# line-height

Specify a scale for line-heights.

```css
a {
  line-height: 1;
}
/**            ↑
 *             This size */
```

This rule assumes unitless line-heights.

## Options

`array`

Given:

```json
[1, 1.5]
```

The following patterns are considered violations:

```css
a {
  line-height: 2;
}
```

```css
a {
  font: 2rem/3 serif;
}
```

The following patterns are _not_ considered violations:

```css
a {
  line-height: 1;
}
```

```css
a {
  font: 2rem/1.5 serif;
}
```
