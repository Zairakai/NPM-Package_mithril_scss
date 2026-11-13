# Typography

The type scale is the one of Material 3: 15 styles, `display`, `headline`, `title`, `body` and `label`, each in `large`, `medium` and `small`. The sizes, line heights and tracking are in px in `$type-scale`, and written in rem where they are used, so they follow the base font size (`$default-font-size`).

```scss
@use "@zairakai/mithril-scss/src/mixins" as mx;

.lead {
  @include mx.type(body-large);
}
```

The same with `@extend`:

```scss
@use "@zairakai/mithril-scss/src/placeholders";

.lead {
  @extend %type-body-large;
}
```

## Emphasized styles

Each style has an emphasized version, for the selected, the active and the important (Material 3 recommends it for badges, primary buttons, selected items): the same size, line height and tracking, one weight step heavier. `type(body-medium, true)` or `@extend %type-emphasized-body-medium`. The values are those of the `md.sys.typescale.emphasized.*` tokens of Material 3, whose only difference with the baseline is the weight (`emphasized-weight` in `$type-scale`).

`get-type($role, $property)` gives one value (`size`, `line-height`, `tracking`, `weight`, `emphasized-weight`, `font`), and `vars("type-body-large-size")` a token to export.

## Headings

`h1` to `h3` are the `headline` styles (large, medium, small) and `h4` to `h6` the `title` styles. Each level of `$headings` names its style in `role`, and adds its margin and padding. The font size of a heading is the fluid one of `$font-size-fluid`.

## Change the scale

```scss
@use "@zairakai/mithril-scss" with (
  $overrides: (
    type-scale: (body-large: (size: 18px, line-height: 28px)),
    headings: (1: (role: display-small))
  )
);
```
