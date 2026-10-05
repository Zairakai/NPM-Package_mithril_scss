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
