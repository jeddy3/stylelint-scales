---
name: "\U0001F41B Report a bug"
about: "Is something not working as you expect?"
---

<!-- Please answer the following. Issues that do not will be closed. -->

> Clearly describe the bug

e.g. "There are false positives for two leading zeros when ..."

> Which rule, if any, is the bug related to?

e.g. `scales/font-size`

> What CSS is needed to reproduce the bug?

e.g.

```css
a {
  font-size: 11.5em;
}
```

> What stylelint configuration is needed to reproduce the bug?

e.g.

```json
{
  "rules": {
    "scales/font-size": [10, 11.5, 14]
  }
}
```

> Which version of stylelint are you using?

e.g. `9.2.0`

> Which version of stylelint-scales are you using?

e.g. `1.0.0`

> How are you running stylelint: CLI, PostCSS plugin, Node.js API?

e.g. "CLI with `stylelint "**/*.css" --config myconfig.json`"

> Does the bug relate to non-standard syntax (e.g. SCSS, Less etc.)?

e.g. "Yes, it's related to SCSS nested properties."

> What did you expect to happen?

e.g. "No warnings to be flagged."

> What actually happened (e.g. what warnings or errors did you get)?

e.g. "The following warnings were flagged:"

```shell
test.css
2:4    Expected "11.50" to be one of "10, 11.5, 14" (scales/font-size)
```

> Please request the `all-contributors` bot add you to the repo README as well, and thanks for helping out.
<!-- 
Using syntax such as 
@all-contributors please add @username for bugs
-->

<!--
Before posting, please check that the bug hasn't already been:
1. fixed in the next release (https://github.com/@signal-noise/stylelint-scales/blob/master/CHANGELOG.md)
2. discussed previously (https://github.com/@signal-noise/stylelint-scales/search)
-->

<!--
You can help us fix the bug more quickly by:
1. Figuring out what needs to be done and proposing it
2. Submitting a PR with failing tests.

Once the bug has been confirmed, you can help out further by writing the code to fix it, updating any tests, and submitting a PR :D
