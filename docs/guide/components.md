# Component styles

`@zairakai/vue-components` ships no style: its components give the markup, the accessibility and the behaviour, with a stable class on every part and `data-*` / ARIA attributes for the state. This stylesheet is a ready-made look for them, built on the tokens of the framework.

```scss
@use "@zairakai/mithril-scss/components";
```

It is opt-in: nothing is emitted unless you `@use` it.

## What it styles

Every category of the library: `Display` (card, badge, avatar, accordion, chip, list, timeline, rating, stat), `Feedback` (alert, banner, cookie banner, progress, skeleton, toast), `Navigation` (tabs, pagination, breadcrumb, stepper, tree, command palette, skip link), `Overlay` (modal, drawer, popover, dropdown, context menu, tooltip), `Data` (table, sortable list), `Content` (code, kbd, code block, terminal, diff, JSON viewer, callout, markdown), `Layout` (app bar, bottom navigation, splitter), `Medias` (carousel, lazy image, lightbox, player), `Form` (combobox, calendar, date picker, range slider, OTP, time picker, tags input, color picker, file dropzone) and `Utility` (theme switcher, share button, countdown).

It styles what the markup gives: the classes (`.card-header`), the ARIA state (`[aria-selected="true"]`, `[aria-current="page"]`) and the `data-*` state (`[data-open]`, `[data-variant="error"]`).

## Tokens

The look is made of CSS custom properties. Change them on `:root`, or on any element to change one part of the page.

| Property | Use |
| :--- | :--- |
| `--primary`, `--on-primary` | Main color and the text on it |
| `--surface`, `--on-surface` | Panels and their text |
| `--background`, `--on-background` | Page |
| `--error` | Error state |
| `--zk-success`, `--zk-warning`, `--zk-info` | Status colors |
| `--zk-border`, `--zk-border-strong` | Borders |
| `--zk-muted` | Secondary text |
| `--zk-hover`, `--zk-pressed` | Interaction layers |
| `--zk-focus` | Focus ring |
| `--zk-radius`, `--zk-radius-lg` | Corners |
| `--zk-space-1` to `--zk-space-4` | Spacing |
| `--zk-shadow-1` to `--zk-shadow-3` | Elevations |

## Configure

```scss
@use "@zairakai/mithril-scss/components" with (
  // The semantic tokens of the dark mode.
  $dark-theme: (primary: #ff5722, on-primary: #000, surface: #000, on-surface: #fff, background: #000, on-background: #fff, error: #f00, on-error: #fff),
  // Do not write the tokens: the application already does it.
  $emit-tokens: false
);
```

## Limit it to a part of a page

To use the stylesheet inside an element only (a documentation site that has its own classes, a widget, a micro-frontend), give it a scope. Every rule is written under the selector, and the tokens (light and dark) are written on it:

```scss
@use "@zairakai/mithril-scss/components" with ($scope: ".demo");
```

## Use it with the theme switcher

```vue
<UtilityThemeSwitcher />
```

The switcher writes `data-theme="light"` or `data-theme="dark"` on the page. Without it the stylesheet follows the preference of the system.
