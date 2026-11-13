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

## Material 3 as the base

The maps follow Material 3, and Material 2 where Material 3 says nothing. They are values to change: see `$overrides` in [getting started](/guide/getting-started).

| Map | Material 3 |
| --- | --- |
| `$breakpoints`, `$breakpoints-height` | window size classes (600, 840, 1200, 1600) and height classes |
| `$grids` | layout grid: 4, 8 and 12 columns (Material 2) |
| `$type-scale`, `$font-family` | the 15 type styles, with the brand and plain typefaces |
| `$shape-radius` | the 10 steps of the corner radius scale |
| `$elevations` | the 6 elevation levels, two layers of shadow each |
| `$states` | the opacities of the state layers: hover 8%, focus and pressed 12%, dragged 16% |
| `$durations`, `$easings` | the duration and easing tokens |

The `-rgb` of a color is its channels, without the alpha: `rgb(var(--primary-rgb) / 50%)`.

## Color roles

`generate-theme()` writes the colors of `$theme` and, from them, the roles of Material 3 that a theme needs: `primary-container` and `on-primary-container` (the same for `secondary` and `error`), `surface-container-lowest` to `surface-container-highest`, `surface-dim`, `surface-bright`, `surface-variant`, `on-surface-variant`, `outline`, `outline-variant`, `inverse-surface` and `inverse-on-surface`. Each one has its `-rgb` twin.

A role is a tone of a color: a container is tone 90 of its color in the light mode and tone 30 in the dark mode, the text on it is tone 10 and 90. The tones are Material's baseline ones, in `$theme-roles`, and the tone is the `L*` of CIELAB, so two roles with the same tone have the same contrast against black and white whatever the theme. Change the primary color and its containers follow.

```scss
.chip {
  background: fn.theme("primary-container");
  color: fn.theme("on-primary-container");
}
```

`color-tone($color, $tone)` makes any tone of any color. It uses the hue and chroma of CIELCH where Material uses HCT, so the colors are close to Material's but not identical: the baseline purple at tone 40 is within one unit per channel, at tone 90 it is `#ecdfff` (Material has `#eaddff`). The neutral roles are pure greys, without the tint that Material gives them from its seed color.

## Accessibility

The component styles ask for more contrast when the reader does (`prefers-contrast: more`: stronger borders and muted text), use the system colors in forced colors (`forced-colors: active`), and stop the ripple, the transitions and the animations for `prefers-reduced-motion`.

The ripple of a press is the `.ripple` class, or `@include mx.ripple` from Sass. It is CSS only: centered by default, and it starts where the press happened if you set `--ripple-x` and `--ripple-y`.
