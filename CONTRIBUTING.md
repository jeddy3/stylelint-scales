# Contributing

## Getting started

1. Install [Node.js](https://nodejs.org/en/)
2. Run `npm install` to install dependencies

## Commands

- `npm test -- --watch` to start interactive test prompt
- `npm test` to run tests
- `npm run check` to run checks
- `npm run fix` to fix check violations

## Releasing

1. Add the version's changes to `CHANGELOG.md` and commit.
2. Bump the version, which also commits and tags it:

   ```bash
   npm version patch # or minor, or major
   ```

3. Push the commit and the tag:

   ```bash
   git push --follow-tags origin main
   ```

4. Approve the staged package:

   ```bash
   npm stage list stylelint-scales
   npm stage approve <stage-id>
   ```

5. Create a GitHub release.
