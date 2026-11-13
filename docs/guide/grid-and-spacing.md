# Grid and spacing

The grid and the spacing scale are `%placeholders` generated from the `$grids` and `$spacings` maps. Extend the one you need:

```scss
@use "@zairakai/mithril-scss/src/grid";
@use "@zairakai/mithril-scss/src/spacing";

.layout {
  @extend %grid;
  @extend %grid-cols-3;
  @extend %gap-16;
}

.panel {
  @extend %p-16;
  @extend %m-8;
}
```

The mixins give the same without `@extend`:

```scss
@use "@zairakai/mithril-scss/src/mixins" as mx;

.panel {
  @include mx.p(16);
}
```

See the [mixins](/reference/mixins) and [placeholders](/reference/placeholders) references.

## Breakpoints, mobile first

The styles are written for the smallest screen first (a phone of 320px), and a media query only redefines what changes from its width up. The width classes follow Material 3: `medium` 600px, `expanded` 840px, `large` 1200px, `extra-large` 1600px. What is not in a query is the base, for the smallest screen; `base` is also the name of its grid and container.

```scss
@use "@zairakai/mithril-scss/src/mixins" as mx;

.layout {
  display: block;

  @include mx.respond-to(medium) {
    display: grid;
  }

  @include mx.respond-to(expanded) {
    grid-template-columns: 1fr 3fr;
  }
}
```

`respond-to($key, $range)` takes `min` (default, from the class up), `max` (up to the class) or `both`. For the wide but short screens (a phone in landscape), `media-queries-height(medium)` writes a `min-height` query. The grid goes from 4 columns on a phone to 8 on a tablet and 12 from `expanded`, like Material. Change the classes with `$overrides: (breakpoints: (medium: 640px))`.
