# font-sizes

Specify scales for font sizes.

```css
a {
  font-size: 1rem;
}
/**          ↑
 *           This size */
```

This rule can automatically fix all of the problems reported.

This rule checks `<length>` and `<percentage>` values.

This rule can be paired with the [`declaration-property-unit-allowed-list`](https://stylelint.io/user-guide/rules/declaration-property-unit-allowed-list) rule in stylelint, using the RegEx:

```
/^font-size$|^font$/
```

## Options

`array` of `objects` as `{scale: [], units: []}`

Given:

```json
[
  { "scale": [1, 2], "units": ["em", "rem"] },
  { "scale": [16, 32], "units": ["px"] }
]
```

The following patterns are considered violations:

```css
a {
  font-size: 16rem;
}
```

```css
a {
  font: 2px/1 serif;
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
  font: 16px/1 serif;
}
```

## Optional secondary options

### `ignoreFunctionArguments: { "function-name": [<zero-indexed-args>] }`

Given:

```json
[
  [{ "scale": [1, 2], "units": ["rem"] }],
  {
    "ignoreFunctionArguments": { "clamp": [1], "min": [0, 1] }
  }
]
```

The following patterns are _not_ considered problems:

```css
a {
  font-size: clamp(1rem, 0.37rem + 0.45vw, 2rem);
}
```

```css
a {
  font-size: min(3rem, 4rem);
}
```
