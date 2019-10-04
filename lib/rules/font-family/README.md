# font-family

Specify a scale for font-family.

```css
a {
  font-family: "Times New Roman", Times, serif;
}
/**            ↑
 *             This font-family */
```

This rule validates all found fonts declared.

## Options

`array`

Given:

```json
["Times New Roman", "Times", "serif"]
```

The following patterns are considered violations:

```css
a {
  font-family: Tahoma;
}
```

```css
a {
  font-family: Times, Tahoma;
}
```

```css
a {
  font: 900 1rem/1 Tahoma;
}
```

The following patterns are _not_ considered violations:

```css
a {
  font-family: "Times New Roman", Times;
}
```

```css
a {
  font: 700 1rem/1 "Times New Roman", Times, serif;
}
```