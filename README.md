# @zairakai/mithril-scss

[![Main][pipeline-main-badge]][pipeline-main-link]
[![Develop][pipeline-develop-badge]][pipeline-develop-link]

[![npm][npm-badge]][npm-link]
[![GitLab Release][gitlab-release-badge]][gitlab-release]
[![License][license-badge]][license]

[![Node.js][node-badge]][node]
[![ESLint][eslint-badge]][eslint]
[![Prettier][prettier-badge]][prettier]

Mithril is a lightweight and indestructible modular SCSS framework for building responsive layouts with a clean grid system.

---

## Install

```bash
npm install @zairakai/mithril-scss
```

---

## Import

Import the full framework (functions, mixins, variables, placeholders):

```scss
@use "@zairakai/mithril-scss" as mithril;
```

Or cherry-pick only what you need:

```scss
@use "@zairakai/mithril-scss/src/functions" as fn;
@use "@zairakai/mithril-scss/src/mixins" as mx;
@use "@zairakai/mithril-scss/src/variables" as vars;
@use "@zairakai/mithril-scss/src/placeholders";
@use "@zairakai/mithril-scss/src/grid";
@use "@zairakai/mithril-scss/src/spacing";
```

Opt-in base stylesheets (not included in `index.scss`):

```scss
@use "@zairakai/mithril-scss/bases/reset.scss";
```

---

## Variables

All design tokens are `!default` — override them before importing:

```scss
@use "@zairakai/mithril-scss/src/variables" as vars with (
  $default-font-size: 18px,
  $spacings: (sm: 12px, md: 20px, lg: 40px)
);
```

### Spacing

`$spacings` — spacing scale used by `%p-*`, `%m-*`, `%gap-*`, `mx.p()`, `mx.m()`, `fn.get-spacing()`.

<details>
<summary>All spacing keys</summary>

| Key | Value | Aliases |
| :--- | :--- | :--- |
| `0` | 0px | `none` |
| `1` | 1px | — |
| `2` | 2px | — |
| `4` | 4px | — |
| `7` | 7px | — |
| `8` | 8px | `xs` |
| `16` | 16px | `sm` |
| `20` | 20px | — |
| `22` | 22px | — |
| `24` | 24px | `md` |
| `32` | 32px | `lg` |
| `40` | 40px | — |
| `48` | 48px | `xl` |

```scss
padding: fn.get-spacing("md");  // → 1.5rem
padding: fn.get-spacing("sm");  // → 1rem
padding: fn.get-spacing("xl");  // → 3rem
padding: fn.get-spacing("4");   // → 0.25rem
padding: fn.get-spacing("sm", true); // → 16px (raw px)
```

</details>

### Typography

<details>
<summary>$font-weight — all keys</summary>

| Key | Value | Aliases |
| :--- | :--- | :--- |
| `thin` | 100 | — |
| `extra-light` | 200 | `ultra-light` |
| `light` | 300 | — |
| `normal` | 400 | `base` |
| `medium` | 500 | — |
| `semi-bold` | 600 | `demi-bold` |
| `bold` | 700 | — |
| `extra-bold` | 800 | `ultra-bold` |
| `black` | 900 | `heavy` |

</details>

<details>
<summary>$font-size — all sizes and aliases</summary>

| Key | Value |
| :--- | :--- |
| `12` | 12px |
| `14` | 14px |
| `16` / `base` | 16px |
| `18` / `medium` | 18px |
| `20` / `large` | 20px |
| `22` | 22px |
| `24` | 24px |
| `26` | 26px |
| `28` | 28px |
| `32` | 32px |
| `34` | 34px |
| `36` | 36px |
| `38` | 38px |
| `40` | 40px |
| `42` | 42px |
| `44` | 44px |
| `46` | 46px |
| `48` | 48px |
| `50` | 50px |
| `52` | 52px |
| `54` | 54px |
| `56` | 56px |
| `58` | 58px |

</details>

<details>
<summary>$font-size-fluid — all fluid steps</summary>

Each step generates a `clamp(min, fluid, max)` value accessible as `var(--font-size-fluid-{key})`.

| Key | min | fluid | max |
| :--- | :--- | :--- | :--- |
| `sm` | 14px | 1.4vw | 16px |
| `base` | 16px | 1.6vw | 18px |
| `md` | 18px | 2vw | 20px |
| `lg` | 20px | 2.4vw | 24px |
| `xl` | 24px | 3vw | 26px |
| `h6` | 16px | 1.2vw | 20px |
| `h5` | 20px | 1.5vw | 24px |
| `h4` | 24px | 2vw | 28px |
| `h3` | 28px | 2.5vw | 30px |
| `h2` | 30px | 3vw | 32px |
| `h1` | 32px | 4vw | 34px |

```scss
font-size: fn.calculate-fluid-font(16px, 2vw, 24px);
// → clamp(1rem, 2vw, 1.5rem)
```

</details>

<details>
<summary>$line-height — all keys</summary>

| Key | Value |
| :--- | :--- |
| `base` | 1.2 |
| `3` | 1.3 |
| `4` | 1.4 |
| `5` | 1.5 |
| `6` | 1.6 |
| `16` | 16px |
| `large` | 20px |

</details>

<details>
<summary>$letter-spacings — pattern</summary>

Semantic aliases for quick usage:

| Key | Value | Typical use |
| :--- | :--- | :--- |
| `tight` | −0.5px | Tight tracking for display headings |
| `normal` | 0px | Body text |
| `wide` | 0.5px | Slightly loose tracking |
| `wider` | 1px | Loose uppercase labels |
| `widest` | 1.5px | Spread-out all-caps |

50+ granular keys also available — negative to positive in fractional steps:

| Pattern | Examples |
| :--- | :--- |
| Negative | `neg-one-half` (−1.5px), `neg-one` (−1px), `neg-half` (−0.5px), `neg-quarter` (−0.25px), `neg-tenth` (−0.1px) |
| Zero | `normal` (0px) |
| Positive | `tenth` (0.1px), `quarter` (0.25px), `half` (0.5px), `one` (1px), `one-half` (1.5px) |

Full range: `neg-one-half` → `one-half` with fractional steps (fiftieth, fortieth, thirtieth, twentieth, tenth, quarter, third, half, two-thirds, etc.).

</details>

### Breakpoints

`$breakpoints` — used by `mx.media-queries()`, `fn.get-container()`, `fn.get-grid()`.

<details>
<summary>All breakpoint keys and ranges</summary>

Landscape:

| Key | min-width | max-width |
| :--- | :--- | :--- |
| `small` | 426px | 767px |
| `small-tablet` | 768px | 1023px |
| `large-tablet` | 1024px | 1279px |
| `laptop` | 1280px | 1439px |
| `desktop` | 1440px | 1919px |
| `wide-screen` | 1920px | 2560px |

Portrait:

| Key | min-width | max-width |
| :--- | :--- | :--- |
| `small` | 321px | 375px |
| `medium` | 376px | 425px |
| `large` | 426px | 767px |
| `small-tablet` | 768px | 1023px |
| `large-tablet` | 1024px | 1279px |
| `laptop` | 1280px | 1439px |
| `desktop` | 1440px | 1919px |
| `wide-screen` | 1920px | 2560px |

</details>

### Shape radius

`$shape-radius` contains two kinds of keys:

- **Base keys** — a single px or % value, used with `mx.shape()`.
- **Directional variants** — a pre-computed CSS shorthand (e.g. `12px 12px 0 0`), for
  **direct use only** (via `vars.vars()` or `map.get`). They cannot be passed to `mx.shape()`
  because the mixin expects a single value, not a shorthand list.

<details>
<summary>All shape-radius keys</summary>

Base keys (safe with `mx.shape()`):

| Key | Value |
| :--- | :--- |
| `0` / `none` | 0px |
| `1` / `extra-small` | 4px |
| `2` | 8px |
| `3` | 10px |
| `medium` | 12px |
| `4` / `large` | 16px |
| `5` | 22px |
| `20` | 20px |
| `6` / `full` | 50% |

Directional variants (direct CSS use only, not for `mx.shape()`):

| Key | CSS value |
| :--- | :--- |
| `extra-small-top` | 4px 4px 0 0 |
| `extra-small-end` | 0 4px 4px 0 |
| `extra-small-bottom` | 0 0 4px 4px |
| `extra-small-start` | 4px 0 0 4px |
| `medium-top` | 12px 12px 0 0 |
| `medium-end` | 0 12px 12px 0 |
| `medium-bottom` | 0 0 12px 12px |
| `medium-start` | 12px 0 0 12px |
| `large-top` | 16px 16px 0 0 |
| `large-end` | 0 16px 16px 0 |
| `large-bottom` | 0 0 16px 16px |
| `large-start` | 16px 0 0 16px |
| `20-top` | 20px 20px 0 0 |
| `20-end` | 0 20px 20px 0 |
| `20-bottom` | 0 0 20px 20px |
| `20-start` | 20px 0 0 20px |
| `full-top` | 50% 50% 0 0 |
| `full-end` | 0 50% 50% 0 |
| `full-bottom` | 0 0 50% 50% |
| `full-start` | 50% 0 0 50% |

`start` = left side (top-left + bottom-left), `end` = right side (top-right + bottom-right).

```scss
// Direct use via CSS custom property
border-radius: vars.vars("shape-medium-top"); // → var(--shape-medium-top)

// Direct use via map.get
@use "sass:map";
border-radius: map.get(MithrilVariables.$shape-radius, "medium-top"); // → 12px 12px 0 0
```

</details>

### Elevations

`$elevations` — 6 levels (0–5), each composed of 3 shadow layers.

<details>
<summary>Elevation structure</summary>

Each level contains 3 steps (1, 2, 3) with `size`, `color`, and `alpha`:

| Level | Step 1 | Step 2 | Step 3 |
| :--- | :--- | :--- | :--- |
| `0` | 0 0 0 0 / 0.20 | 0 0 0 0 / 0.14 | 0 0 0 0 / 0.12 |
| `1` | 0 2 1 -1 / 0.20 | 0 1 1 0 / 0.14 | 0 1 3 0 / 0.12 |
| `2` | 0 3 3 -2 / 0.20 | 0 3 4 0 / 0.14 | 0 1 8 0 / 0.12 |
| `3` | 0 3 5 -1 / 0.20 | 0 6 10 0 / 0.14 | 0 1 18 0 / 0.12 |
| `4` | 0 5 5 -3 / 0.20 | 0 8 10 1 / 0.14 | 0 3 14 2 / 0.12 |
| `5` | 0 7 8 -4 / 0.20 | 0 12 17 2 / 0.14 | 0 5 22 4 / 0.12 |

Values shown as: `offset-x offset-y blur spread` (px) / `alpha`.

```scss
// Retrieve a specific property
$blur: fn.get-elevation-value(2, 1, "size"); // → size map of step 1 at level 2
```

</details>

### Colors

`$colors` — Material Design palette.

<details>
<summary>All color families and shade pattern</summary>

**20 families:** `red`, `pink`, `purple`, `deep-purple`, `indigo`, `blue`, `light-blue`, `cyan`, `teal`, `green`, `light-green`, `lime`, `yellow`, `amber`, `orange`, `deep-orange`, `brown`, `grey`, `blue-grey`, `black`, `white`.

**Shade keys** (most families):

| Key | Description |
| :--- | :--- |
| `lighten-5` | Lightest tint |
| `lighten-4` | — |
| `lighten-3` | — |
| `lighten-2` | — |
| `lighten-1` | — |
| `default` | Base color |
| `darken-1` | — |
| `darken-2` | — |
| `darken-3` | — |
| `darken-4` | Darkest shade |
| `accent-1` | Accent (lighter) |
| `accent-2` | — |
| `accent-3` | — |
| `accent-4` | Accent (darker) |

`brown`, `grey`, `blue-grey` have no accent variants. `black` and `white` have only `default`.

```scss
// Access via CSS variable (after export-css-variables)
color: vars.vars("blue-darken-2");
background: vars.vars("red-lighten-4");

// Direct in SCSS
$c: map.get(MithrilVariables.$colors, blue, default); // → #2196f3
```

</details>

### States and opacity

<details>
<summary>$states and $opacity keys</summary>

**`$states`**

| Key | Value |
| :--- | :--- |
| `state-hover-state-layer-opacity` | 0.08 |
| `state-hover-state-layer-opacity-forced` | 0.2 |
| `state-focus-state-layer-opacity` | 0.1 |
| `state-pressed-state-layer-opacity` | 0.1 |
| `state-disabled-opacity` | 0.38 |
| `state-disabled-outline-opacity` | 0.12 |
| `state-disabled-container-opacity` | 0.04 |

**`$opacity`**

| Key | Value |
| :--- | :--- |
| `disabled` | 0.38 |

```scss
opacity: vars.vars("state-disabled-opacity");
opacity: vars.vars("opacity-disabled");
```

</details>

### CSS custom properties

Use `vars.vars('token-name')` to reference a token and automatically register it for export:

```scss
.card {
  color: vars.vars("grey-darken-2");
  gap: vars.vars("spacing-md");
}
```

Then call `export-css-variables` once at root to emit only the tokens actually used:

```scss
@use "@zairakai/mithril-scss/src/mixins" as mx;

:root {
  @include mx.export-css-variables();
}
```

---

## Functions

`@use "@zairakai/mithril-scss/src/functions" as fn`

### Unit conversion

```scss
// Single value
padding: fn.px-to-rem(16px); // → 1rem

// Multiple values
margin: fn.px-to-rem(16px 8px 0 8px); // → 1rem 0.5rem 0 0.5rem

// Force 0rem instead of plain 0
border-width: fn.px-to-rem(0, (force-zero-rem: true)); // → 0rem

// Custom base font size
font-size: fn.px-to-rem(24px, (base-font-size: 10px)); // → 2.4rem

// Remove unit from a value
$n: fn.strip-unit(16px); // → 16
$n: fn.strip-unit(1.5rem); // → 1.5
```

### Fluid typography

```scss
font-size: fn.calculate-fluid-font(16px, 2vw, 24px);
// → clamp(1rem, 2vw, 1.5rem)
```

### Spacing, grid, and typography

```scss
padding: fn.get-spacing("md");           // → 1.5rem
padding: fn.get-spacing("sm", true);     // → 16px (raw px, skip rem)

line-height: fn.get-line-height("base"); // → 1.2
line-height: fn.get-line-height("5");    // → 1.5
```

<details>
<summary>get-heading — levels and properties</summary>

Levels: `1`, `2`, `3`, `4`, `5`, `6` (h1–h6).

Properties: `line-height`, `margin`, `padding`, `spacing` (letter-spacing), `weight`.

```scss
font-weight:    fn.get-heading(1, "weight");       // → 300
line-height:    fn.get-heading(1, "line-height");  // → 1.2
margin:         fn.get-heading(2, "margin");       // → 0 0 0.75rem 0
letter-spacing: fn.get-heading(3, "spacing");      // → normal
font-weight:    fn.get-heading(6, "weight");       // → 700
```

</details>

<details>
<summary>get-grid — keys and properties</summary>

Properties: `cols` (column count), `gap` (gutter in rem).

```scss
$cols: fn.get-grid("laptop", "cols", "landscape");  // → 8
$gap:  fn.get-grid("laptop", "gap",  "landscape");  // → 2rem
$cols: fn.get-grid("small",  "cols", "portrait");   // → 2
```

See breakpoint keys in the [Variables / Breakpoints](#breakpoints) section.

</details>

<details>
<summary>get-container — keys</summary>

Returns the max container width in rem for a breakpoint + orientation pair.

```scss
max-width: fn.get-container("laptop",      "landscape"); // → 80rem
max-width: fn.get-container("desktop",     "landscape"); // → 90rem
max-width: fn.get-container("small-tablet","portrait");  // → 48rem
```

See breakpoint keys in the [Variables / Breakpoints](#breakpoints) section.

</details>

<details>
<summary>get-value-from-map — deep traversal</summary>

Traverses any nested map with a list of keys.

```scss
@use "sass:map";

$my-map: (
  layout: (
    sidebar: (width: 280px),
    content: (width: 960px),
  ),
);

$w: fn.get-value-from-map($my-map, layout, sidebar, width); // → 280px
```

</details>

### Color utilities

```scss
// Semantic theme token → var() reference (companion to mx.generate-theme)
background: fn.theme("primary");   // → var(--primary)
color:       fn.theme("on-primary"); // → var(--on-primary)
// For rgb() usage, access the companion var directly:
box-shadow: 0 2px 8px rgb(var(--primary-rgb) / 0.3);

// Get a color from the $colors Material palette
$c: fn.get-color("red");                   // → #f44336 (default variant)
$c: fn.get-color("blue-grey", "darken-2"); // → #455a64
$c: fn.get-color("green", "accent-4");     // → #00c853

// Readable foreground based on background lightness (default threshold: 50)
color: fn.color-lisibility($bg, #000, #fff);

// Custom threshold — use 60 for better contrast on near-mid tones
color: fn.color-lisibility($bg, #000, #fff, 60);

// Color with opacity
background: fn.color-alpha(#1a73e8, 20%); // → rgb(26 115 232 / 20%)

// As rgb() string
color: fn.color-rgb(#1a73e8);             // → rgb(26 115 232)

// As a map of channels (red, green, blue)
$ch: fn.color-rgb(#1a73e8, false);        // → (red: 26, green: 115, blue: 232)
```

### Geometry

```scss
// Aspect ratio as percentage (padding-top trick)
padding-top: fn.ratio(16, 9); // → 56.25%

// Mirror corners — symmetry: horizontal | vertical | diagonal
$m: fn.corners-cut-symmetry($corners, "diagonal");
```

---

## Mixins

`@use "@zairakai/mithril-scss/src/mixins" as mx`

### Responsive media queries

`mx.respond-to()` is the recommended shorthand. `mx.media-queries()` is the lower-level equivalent.

```scss
// Shorthand: specific breakpoint + orientation
@include mx.respond-to("laptop", "landscape") { ... }
@include mx.respond-to("small-tablet", "portrait") { ... }

// Bounded range (min + max)
@include mx.respond-to("laptop", "landscape", "both") { ... }

// Max-width only
@include mx.respond-to("small", "portrait", "max") { ... }

// All breakpoints for an orientation
@include mx.media-queries($orientation: landscape) { ... }
```

Range options: `min` (default), `max`, `both`.

See available breakpoint keys in the [Variables / Breakpoints](#breakpoints) section.

### Layout

```scss
// Flexbox — direction | justify | align | wrap
@include mx.flexbox(row, center, center, wrap);
@include mx.flexbox(column, flex-start, stretch, nowrap);

// CSS grid — columns | gap
@include mx.grid(12, 24px);
@include mx.grid(); // uses $default-grid-columns and sm spacing

// Constrain to a named container max-width
@include mx.container("laptop",  "landscape"); // max-width: 80rem; margin-inline: auto
@include mx.container("desktop", "portrait");  // max-width: 90rem; margin-inline: auto
```

See container keys in the [Variables / Breakpoints](#breakpoints) section.

### Spacing

```scss
// From an explicit map
@include mx.padding((top: 16px, right: 8px, bottom: 16px, left: 8px));

// From $spacings key — p / m + direction
@include mx.p("md");      // padding: 1.5rem (all sides)
@include mx.p("sm", "t"); // padding-top
@include mx.p("sm", "r"); // padding-right
@include mx.p("sm", "b"); // padding-bottom
@include mx.p("sm", "l"); // padding-left
@include mx.p("sm", "v"); // padding top + bottom
@include mx.p("sm", "h"); // padding left + right

@include mx.m("lg");      // margin: 2rem (all sides)
@include mx.m("sm", "t"); // margin-top
@include mx.m("sm", "v"); // margin top + bottom
// same direction options as mx.p()
```

Direction options: `t`, `r`, `b`, `l`, `v`, `h`, or omit for all sides.

See spacing keys in the [Variables / Spacing](#spacing) section.

### Shape

```scss
// Full border-radius from $shape-radius key
@include mx.shape("medium");          // border-radius: 0.75rem
@include mx.shape("full");            // border-radius: 50%

// Single corner or side
@include mx.shape("medium", "top");         // top-left + top-right
@include mx.shape("large",  "top-left");   // top-left corner only
@include mx.shape("medium", "right");      // top-right + bottom-right
@include mx.shape("medium", "bottom");     // bottom-left + bottom-right
@include mx.shape("large",  "left");       // top-left + bottom-left

// With symmetry — mirror the active corner(s) across an axis
@include mx.shape("medium", "top-left", "diagonal");    // border-radius: 0.75rem 0 0.75rem 0
@include mx.shape("large",  "top-left", "horizontal");  // border-radius: 1rem 0 0 1rem
@include mx.shape("medium", "top-left", "vertical");    // border-radius: 0.75rem 0.75rem 0 0
```

`$cornerOrSide` options: `top`, `right`, `bottom`, `left`, `top-left`, `top-right`, `bottom-right`, `bottom-left`, or omit for all corners.

`$symmetry` options: `horizontal` (mirrors top↔bottom), `vertical` (mirrors left↔right), `diagonal` (mirrors top-left↔bottom-right and top-right↔bottom-left). If omitted, no mirroring is applied.

Only pass **base keys** (single values) to `mx.shape()` — directional variants (`medium-top`, etc.)
are pre-computed shorthands for direct CSS use only. See [Variables / Shape radius](#shape-radius).

### Elevation

```scss
@include mx.elevation(0); // no shadow
@include mx.elevation(2); // medium shadow (#000)
@include mx.elevation(4, #1a73e8); // deep shadow with custom color
```

Levels: `0` (flat) → `5` (floating). See structure in [Variables / Elevations](#elevations).

### Typography

Apply heading styles, font sizes, fluid sizes, and line-heights directly from the token maps.

```scss
// Heading — applies margin, padding, line-height, font-weight, letter-spacing (no font-size)
h1 { @include mx.heading(1); }
h2 { @include mx.heading(2); }

// Pair with fluid font size if needed
h1 { @include mx.heading(1); @include mx.text-fluid("h1"); }

// Static font-size from $font-size
.label   { @include mx.font-size(14); }    // font-size: 0.875rem
.body    { @include mx.font-size("base"); } // font-size: 1rem
.display { @include mx.font-size(32); }    // font-size: 2rem

// Fluid font-size with clamp() from $font-size-fluid
.hero  { @include mx.text-fluid("h1"); }   // font-size: clamp(2rem, 4vw, 2.125rem)
.intro { @include mx.text-fluid("lg"); }   // font-size: clamp(1.25rem, 2.4vw, 1.5rem)
.body  { @include mx.text-fluid("base"); } // font-size: clamp(1rem, 1.6vw, 1.125rem)

// Line-height — unitless ratios applied as-is, px values converted to rem
.tight  { @include mx.line-height("base");  } // line-height: 1.2
.body   { @include mx.line-height(5);       } // line-height: 1.5
.spacer { @include mx.line-height("large"); } // line-height: 1.25rem
```

`text-fluid` keys: `sm`, `base`, `md`, `lg`, `xl`, `h1`–`h6`.

See all keys in [Variables / Typography](#typography).

### State

Material Design state layers and disabled styling.

```scss
// State layer — overlays a currentcolor pseudo-element at the right opacity
.btn { @include mx.state-layer("hover");   } // opacity: 0.08
.btn { @include mx.state-layer("focus");   } // opacity: 0.10
.btn { @include mx.state-layer("pressed"); } // opacity: 0.10

// Disabled — opacity + pointer-events: none + cursor: not-allowed
.btn:disabled { @include mx.state-disabled(); }
```

`mx.state-layer()` sets `position: relative` on the host and generates a `::before` pseudo-element. Make sure the element has `overflow: hidden` if you want the layer clipped.

### Triangle

```scss
@include mx.triangle(down, 8px, currentColor);
@include mx.triangle(up, 12px, #e91e63);
@include mx.triangle(top-right, 16px, #2196f3);
```

Direction options: `up`, `right`, `down`, `left`, `top-right`, `bottom-right`, `bottom-left`, `top-left`.

### Corner cuts

```scss
// Custom corners
@include mx.corners-cut((top-left: 12px, bottom-right: 12px));

// With symmetry: horizontal | vertical | diagonal
@include mx.corners-cut((top-left: 12px), "diagonal");
// diagonal mirrors top-left → bottom-right and top-right → bottom-left
```

### Theme

Generates semantic CSS custom properties at `:root` — one call replaces all your manual `--primary: …` declarations.

```scss
// Default theme (Material palette — blue primary, purple secondary)
:root {
  @include mx.generate-theme();
}

// Partial override — only the tokens you specify change
:root {
  @include mx.generate-theme((
    primary:    #ff5722,
    on-primary: #fff,
  ));
}
```

Each token outputs two vars: the color and its RGB channels for `rgba()` usage:

```scss
// Generated output example:
// --primary: #448aff
// --primary-rgb: 68 138 255

.btn {
  background: fn.theme("primary");            // → var(--primary)
  box-shadow: 0 2px 8px rgb(var(--primary-rgb) / 0.3);
}
```

<details>
<summary>All default theme tokens</summary>

| Token | Default color | Source |
| :--- | :--- | :--- |
| `primary` | `#455a64` | `blue-grey / darken-2` |
| `primary-variant` | `#263238` | `blue-grey / darken-4` |
| `on-primary` | `#fff` | `white` |
| `secondary` | `#607d8b` | `blue-grey / default` |
| `secondary-variant` | `#546e7a` | `blue-grey / darken-1` |
| `on-secondary` | `#fff` | `white` |
| `surface` | `#fff` | `white` |
| `on-surface` | `#212121` | `grey / darken-4` |
| `background` | `#fafafa` | `grey / lighten-5` |
| `on-background` | `#212121` | `grey / darken-4` |
| `error` | `#f44336` | `red / default` |
| `on-error` | `#fff` | `white` |

Each token also generates a `--token-rgb` companion for `rgb()` / `rgba()` use.

</details>

### CSS variables export

```scss
:root {
  @include mx.export-css-variables();
  // exports only tokens referenced via vars.vars() in your codebase

  // optionally pass extra tokens to export
  @include mx.export-css-variables((my-brand: #ff5722));
}
```

---

## Placeholders

Extend shared styles without duplicating CSS output.

### Layout

```scss
.hero { @extend %flex-center; }   // display: flex; justify + align: center
.card { @extend %grid-center; }   // display: grid; place-items: center
.main { @extend %container; }     // responsive max-width from $breakpoints
```

### Typography

```scss
h1 { @extend %h1; } // applies line-height, margin, font-size (fluid), weight
h2 { @extend %h2; }
// %h1 to %h6 available

.label   { @extend %font-size-14; }
.caption { @extend %font-size-base; }

.light  { @extend %font-weight-light; }
.bold   { @extend %font-weight-bold; }
// see $font-weight for all keys

.body  { @extend %line-height-5; }   // 1.5
.tight { @extend %line-height-base; } // 1.2
// see $line-height for all keys
```

### Spacing

Generated from all `$spacings` keys. Available directions: `p`, `pt`, `pr`, `pb`, `pl`, `pv`, `ph` for padding, `m`, `mt`, `mr`, `mb`, `ml`, `mv`, `mh` for margin, `gap` for gap.

```scss
.section { @extend %p-lg; }    // padding: 2rem
.header  { @extend %pt-md; }   // padding-top: 1.5rem
.row     { @extend %pv-sm; }   // padding top + bottom: 1rem
.col     { @extend %ph-sm; }   // padding left + right: 1rem
.item    { @extend %pr-4; }    // padding-right: 0.25rem

.block   { @extend %m-md; }    // margin: 1.5rem
.title   { @extend %mb-sm; }   // margin-bottom: 1rem
.stack   { @extend %mv-lg; }   // margin top + bottom: 2rem
.inline  { @extend %mh-xs; }   // margin left + right: 0.5rem

.list    { @extend %gap-sm; }  // gap: 1rem
.grid    { @extend %gap-md; }  // gap: 1.5rem
```

<details>
<summary>All spacing keys for placeholders</summary>

Available `{key}` values: `0`, `none`, `1`, `2`, `4`, `7`, `8`, `xs`, `16`, `sm`, `20`, `22`, `24`, `md`, `32`, `lg`, `40`, `48`, `xl`.

Example: `%p-xs` → `padding: 0.5rem`, `%gap-xl` → `gap: 3rem`.

</details>

### Grid

```scss
.layout  { @extend %grid; }          // responsive grid from $grids config
.sidebar { @extend %grid-cols-3; }   // fixed 3-column grid
.hero    { @extend %grid-cols-12; }  // fixed 12-column grid
// %grid-cols-1 to %grid-cols-12 available
```

---

## Bases

### bases/reset.scss

Minimal CSS reset: `box-sizing: border-box`, `outline` normalization, `html` font and line-height, `body` margin/padding reset, and base element normalization (headings, lists, links, media, forms).

```scss
@use "@zairakai/mithril-scss/bases/reset.scss";
```

## Getting Help

[![License][license-badge]][license]
[![Security Policy][security-badge]][security]
[![Issues][issues-badge]][issues]

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the development workflow.

**Made with ❤️ by [Zairakai][ecosystem]**

<!-- Reference Links -->

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
[issues-badge]: https://img.shields.io/gitlab/issues/open-raw/zairakai%2Fnpm-packages%2Fmithril?logo=gitlab&label=Issues
[issues]: https://gitlab.com/zairakai/npm-packages/mithril-scss/-/issues
[node-badge]: https://img.shields.io/badge/node.js-%3E%3D22-green.svg?logo=node.js
[node]: https://nodejs.org
[eslint-badge]: https://img.shields.io/badge/code%20style-eslint-4B32C3.svg?logo=eslint
[eslint]: https://eslint.org
[prettier-badge]: https://img.shields.io/badge/formatter-prettier-F7B93E.svg?logo=prettier
[prettier]: https://prettier.io
[ecosystem]: https://gitlab.com/zairakai
