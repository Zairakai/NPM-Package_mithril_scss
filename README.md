<p align="center">
  <img src="https://gitlab.com/zairakai/npm-packages/mithril-scss/-/raw/main/assets/icon.png" alt="Mithril SCSS" width="160">
</p>

# Mithril SCSS

[![Main][pipeline-main-badge]][pipeline-main-link]
[![Develop][pipeline-develop-badge]][pipeline-develop-link]

[![npm][npm-badge]][npm-link]
[![Docs][docs-badge]][docs]
[![GitLab Release][gitlab-release-badge]][gitlab-release]
[![License][license-badge]][license]

[![Node.js][node-badge]][node]
[![ESLint][eslint-badge]][eslint]
[![Prettier][prettier-badge]][prettier]

Modular SCSS framework: mobile-first grid, design tokens, functions, mixins, light and dark themes.

**Documentation: [mithril-scss-29f2e5.gitlab.io][docs]**

---

## Install

```bash
npm install @zairakai/mithril-scss
```

---

## Usage

Import the full framework (functions, mixins, variables, placeholders):

```scss
@use "@zairakai/mithril-scss" as mithril;
```

The tokens follow Material 3 (breakpoints, type scale, shapes, elevation, motion), mobile first, in rem from the base font size. They are defaults, and everything can be changed, once or per call:

```scss
@use "@zairakai/mithril-scss" with (
  $default-font-size: 18px,
  $overrides: (spacings: (4: 6px), motion: (enter: (duration: long1)))
);

.card { @include mithril.animate(scale-in, $duration: short2); }
```

<details>
<summary>Import the modules one by one</summary>

```scss
@use "@zairakai/mithril-scss/src/functions" as fn;
@use "@zairakai/mithril-scss/src/mixins" as mx;
@use "@zairakai/mithril-scss/src/variables" as vars;
@use "@zairakai/mithril-scss/src/placeholders";
@use "@zairakai/mithril-scss/src/grid";
@use "@zairakai/mithril-scss/src/spacing";
```

Opt-in base stylesheet (not included in `index.scss`; the component styles already start with it):

```scss
@use "@zairakai/mithril-scss/bases/reset.scss";
```

</details>

Opt-in keyframes and `.animate-*` classes, in CSS only, with the motion of Material 3 (a timing for each element, nothing moves for `prefers-reduced-motion`):

```scss
@use "@zairakai/mithril-scss/animations";
```

### Styles for `@zairakai/vue-components`

An opt-in stylesheet styles the class hooks and the state attributes of the components, with the tokens of the framework, light and dark modes included (`data-theme` or the preference of the system):

```scss
@use "@zairakai/mithril-scss/components";   // starts with the reset: $reset: false to turn it off

// Change the dark palette, or leave the tokens to the application:
@use "@zairakai/mithril-scss/components" with ($dark-theme: (...), $emit-tokens: false);
```

To use it inside a part of a page only, give it a scope: `@use "@zairakai/mithril-scss/components" with ($scope: ".demo");`.

The look is made of CSS custom properties (`--primary`, `--surface`, `--zk-border`, `--zk-radius`…): change them on `:root` or on any element.

---

## Documentation

The [documentation site][docs] has the guides and the reference of the functions, mixins, variables and placeholders (parameters, return values, examples), generated from the SassDoc comments of the source: the README does not repeat it. Build it with `cd docs && npm ci && npm run dev`. It is published with GitLab Pages from `main`, with the documentation of every released version (selector at the top right, `next` is `main`) and a gallery of the component styles.

---

## Development

```bash
npm install
make ci              # full CI validation
make test-coverage   # run vitest with coverage
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full development workflow.

---

## Getting Help

[![License][license-badge]][license]
[![Security Policy][security-badge]][security]
[![Issues][issues-badge]][issues]

**Made with ❤️ by [Zairakai][ecosystem]**

<!-- Reference Links -->

## Statistics

![Statistics of mithril-scss][stats-card]

[pipeline-main-badge]: https://gitlab.com/zairakai/npm-packages/mithril-scss/badges/main/pipeline.svg?ignore_skipped=true&key_text=Main
[pipeline-main-link]: https://gitlab.com/zairakai/npm-packages/mithril-scss/-/commits/main
[pipeline-develop-badge]: https://gitlab.com/zairakai/npm-packages/mithril-scss/badges/develop/pipeline.svg?ignore_skipped=true&key_text=Develop
[pipeline-develop-link]: https://gitlab.com/zairakai/npm-packages/mithril-scss/-/commits/develop
[npm-badge]: https://img.shields.io/npm/v/@zairakai/mithril-scss
[npm-link]: https://www.npmjs.com/package/@zairakai/mithril-scss
[gitlab-release-badge]: https://img.shields.io/gitlab/v/release/zairakai/npm-packages/mithril-scss?logo=gitlab
[gitlab-release]: https://gitlab.com/zairakai/npm-packages/mithril-scss/-/releases
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: ./LICENSE
[security-badge]: https://img.shields.io/badge/security-scanned-green.svg
[security]: ./SECURITY.md
[issues-badge]: https://img.shields.io/gitlab/issues/open-raw/zairakai%2Fnpm-packages%2Fmithril-scss?logo=gitlab&label=Issues
[issues]: https://gitlab.com/zairakai/npm-packages/mithril-scss/-/issues
[node-badge]: https://img.shields.io/badge/node.js-%3E%3D22-green.svg?logo=node.js
[node]: https://nodejs.org
[eslint-badge]: https://img.shields.io/badge/code%20style-eslint-4B32C3.svg?logo=eslint
[eslint]: https://eslint.org
[prettier-badge]: https://img.shields.io/badge/formatter-prettier-F7B93E.svg?logo=prettier
[prettier]: https://prettier.io
[ecosystem]: https://gitlab.com/zairakai
[docs]: https://mithril-scss-29f2e5.gitlab.io
[docs-badge]: https://img.shields.io/badge/docs-online-blue
[stats-card]: https://gitlab.com/zairakai/gitlab-profile/-/raw/main/assets/projects/mithril-scss.svg
