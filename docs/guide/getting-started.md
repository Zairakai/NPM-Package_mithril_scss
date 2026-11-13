# Getting started

## Install

```bash
npm install @zairakai/mithril-scss
```

## Use

Import the whole framework (functions, mixins, variables, placeholders):

```scss
@use "@zairakai/mithril-scss" as mithril;
```

Or take only what you need:

```scss
@use "@zairakai/mithril-scss/src/functions" as fn;
@use "@zairakai/mithril-scss/src/mixins" as mx;
@use "@zairakai/mithril-scss/src/variables" as vars;
```

The [component styles](/guide/components) output CSS, and start with the base reset. Turn it off with `$reset: false` if you load your own or already `@use` the reset (the CSS would be written twice):

```scss
@use "@zairakai/mithril-scss/components";
// or, with your own reset
@use "@zairakai/mithril-scss/components" with ($reset: false);
```

The reset alone, without the components, is `@use "@zairakai/mithril-scss/bases/reset";`.

## Override a token

Every design token is `!default`: give your value in the `@use` that loads the framework, before anything else uses it. The font size is the base of `px-to-rem()`.

```scss
@use "@zairakai/mithril-scss" with (
  $default-font-size: 18px,
  $spacings: (sm: 12px, md: 20px, lg: 40px)
);
```

The settings (`$default-font-size`, `$default-line-height`, `$default-grid-columns`, `$element-separator`, `$overrides`) are in `src/config.scss`, see the [configuration reference](/reference/config). The component styles take them in their own `with (...)`.

### Change a few keys of a map

Setting `$spacings` replaces the whole map. To change some keys and keep the others, use `$overrides`, with one entry per map named like the variable. The maps are merged deeply, and what is computed from them follows.

```scss
@use "@zairakai/mithril-scss" with (
  $overrides: (
    spacings: (4: 6px),
    colors: (red: (base: #c00)),
    theme: (primary: #ff5722)
  )
);
```

### One file for all the settings

Sass lets a module be configured once per compilation. Write the settings in one file and `@use` it where you would use the package:

```scss
// _mithril.scss
@forward "@zairakai/mithril-scss" with (
  $default-font-size: 18px,
  $element-separator: "__"
);
```

```scss
@use "mithril";
@use "@zairakai/mithril-scss/components";
@use "@zairakai/mithril-scss/bases/reset";
```

## Defaults and overrides

One rule everywhere: **the variables are the defaults, and a call can override them**.

1. **The variable** holds the value used when nothing else is said: a token (`$spacings`, `$durations`...), a setting (`$default-font-size`) or what a kind of movement uses (`$motion`, `$focus-ring`). Change it once, with `$overrides`, and everything that reads it follows.
2. **The call** overrides it for itself only. A parameter left out (or `null`) takes the variable; a parameter given wins. Name the one you change:

   ```scss
   .submit { @include mx.animate(scale-in); }
   .reset { @include mx.animate(scale-in, $duration: short2, $delay: 80ms); }
   .card { @include mx.elevation(1, $color: #336699); }
   .layout { @include mx.grid(3, $gap: 32px); }
   ```

3. **The element**, for what is written in CSS, overrides with a custom property (`--animate-duration`, `--zk-focus`...), which can be set per selector.

Values are in px in the variables and written in rem, so they follow the base font size at each level.
