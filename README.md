# stylelint-scales

![](https://github.com/signal-noise/stylelint-scales/workflows/node-ci/badge.svg)

[![CircleCI](https://circleci.com/gh/signal-noise/stylelint-scales/tree/master.svg?style=svg&circle-token=6cd2f74acee7f6ef0df7e16880baaf000b604077)](https://circleci.com/gh/signal-noise/stylelint-scales/tree/master)

A plugin pack of scale related linting rules for [stylelint](https://stylelint.io).

## Installation

```
npm install stylelint-scales --save-dev
```

## Usage

Add `stylelint-scales` to your stylelint config plugins array, then add rules you need to the rules list. All rules from `stylelint-scales` need to be namespaced with `scale`.

Like so:

```js
// .stylelintrc
{
	"plugins": [
		"stylelint-scales"
	],
	"rules": {
		"scales/font-size": [1, 1.5, 2],
	}
}
```

## List of rules

- [`color`](./lib/rules/color/README.md): Specify a scale for color.
- [`font-size`](./lib/rules/font-size/README.md): Specify a scale for font-size.
- [`font-weight`](./lib/rules/font-weight/README.md): Specify a scale for font-weight.
- [`line-height`](./lib/rules/line-height/README.md): Specify a scale for line-height.
- [`space`](./lib/rules/space/README.md): Specify a scale for space.
