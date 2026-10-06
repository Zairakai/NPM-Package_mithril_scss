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

The opt-in base reset and the [component styles](/guide/components) are separate, they output CSS:

```scss
@use "@zairakai/mithril-scss/bases/reset.scss";
@use "@zairakai/mithril-scss/components";
```

## Override a token

Every design token is `!default`: give your value before the first `@use`.

```scss
@use "@zairakai/mithril-scss/src/variables" as vars with (
  $default-font-size: 18px,
  $spacings: (sm: 12px, md: 20px, lg: 40px)
);
```
