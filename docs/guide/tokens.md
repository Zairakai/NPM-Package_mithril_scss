# Tokens and theming

## Sass tokens

The tokens are Sass maps in `src/variables.scss`: `$colors` (the Material palette), `$theme` (the semantic tokens), `$spacings`, `$shape-radius`, `$elevations`, `$font-size`, `$breakpoints`, `$grids` and more. See the [variables reference](/reference/variables).

## CSS custom properties

The semantic tokens are written as CSS custom properties with the `generate-theme` mixin:

```scss
@use "@zairakai/mithril-scss/src/mixins" as mx;

:root {
  @include mx.generate-theme();
  // or override some of them
  @include mx.generate-theme((primary: #ff5722, on-primary: #fff));
}
```

It writes `--primary`, `--on-primary`, `--surface`, `--on-surface`, `--background`, `--error`… and a `-rgb` twin of each (`--primary-rgb: 255 87 34`) for colors with an opacity: `rgb(var(--primary-rgb) / 0.5)`.

## Light and dark

The [component styles](/guide/components) write the tokens for light, and for dark under `:root[data-theme="dark"]` and, when `data-theme` is not `light`, under `prefers-color-scheme: dark`. The theme switcher of `@zairakai/vue-components` writes `data-theme` on the page.

`color-scheme` is set for you, so the form controls and the scroll bars follow.
