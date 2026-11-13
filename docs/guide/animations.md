# Motion and animations

Everything moves with CSS only. The durations and easings are the ones of Material 3, in `$durations` and `$easings`, and nothing moves for the readers who set `prefers-reduced-motion`.

## Defaults

What each kind of movement uses is `$motion` (`enter`, `exit`, `enter-small`, `exit-small`, `state`, and the two times of the ripple). The component styles, the keyframes stylesheet and `animate()` all read it, so one `$overrides` changes them together:

```scss
@use "@zairakai/mithril-scss" with (
  $overrides: (motion: (enter: (duration: long1)))
);
```

A call can still give its own: `animate(fade-in, $duration: short2)`.

## The rule of Material 3

What enters the screen is slower and decelerates, what leaves is faster and accelerates, because an exit takes less of the attention than what comes next.

| | Large (dialog, drawer) | Small (menu, popover, toast) |
| --- | --- | --- |
| Enter | 400ms, emphasized decelerate | 250ms, standard decelerate |
| Exit | 200ms, emphasized accelerate | 200ms, standard accelerate |

The [component styles](/guide/components) follow it: a `<dialog class="modal">` or `drawer` fades and grows in and the other way out, with its scrim, and a `popover` or a toast comes in the same way. It is `@starting-style` and `allow-discrete` transitions, so a browser that does not know them just shows and hides the element. The tokens are `--zk-duration-enter`, `--zk-easing-enter`, `--zk-duration-exit` and `--zk-easing-exit`, and their `-small` versions.

## The keyframes

```scss
@use "@zairakai/mithril-scss/animations";
```

It writes the keyframes `zk-fade-in`, `zk-fade-out`, `zk-scale-in`, `zk-scale-out`, `zk-slide-up-in`, `zk-slide-up-out`, `zk-slide-down-in`, `zk-slide-down-out`, `zk-slide-start-in`, `zk-slide-start-out`, `zk-slide-end-in`, `zk-slide-end-out`, `zk-spin`, `zk-pulse` and `zk-shake`, and a class `.animate-<name>` for each. The slides follow the writing direction.

```html
<div class="animate-slide-up-in">Welcome</div>
<span class="animate-spin">Loading</span>
```

### A timing for each element

A submit button and a reset button can have their own. From the markup, with a class for each duration, easing and delay of Material 3:

```html
<button class="animate-scale-in animate-duration-short2">Submit</button>
<button class="animate-scale-in animate-duration-medium2 animate-delay-short3">Reset</button>
```

Or from the stylesheet, with the properties `--animate-duration`, `--animate-easing`, `--animate-delay` and `--animate-iteration`:

```css
.submit { --animate-duration: 120ms; }
.reset { --animate-duration: 300ms; --animate-delay: 80ms; }
```

A property of one animation wins over the general one: `--animate-fade-in-duration` changes `fade-in` only, so an element that has two animations can time them apart. The properties do not inherit (they are registered with `@property`): setting one on a parent does not change its children.

## From Sass

```scss
@use "@zairakai/mithril-scss/src/mixins" as mx;

.panel {
  @include mx.animate(slide-up-in);
}

.panel-leaving {
  @include mx.animate(fade-out, short4, emphasized-accelerate);
}
```

`animate($name, $duration, $easing, $iteration, $delay)` is for one selector: the timing is written in the rule. The durations (`short1` to `extra-long4`) and easings are keys of `$durations` and `$easings`. The keyframes have to be loaded: `@use "@zairakai/mithril-scss/animations"`.
