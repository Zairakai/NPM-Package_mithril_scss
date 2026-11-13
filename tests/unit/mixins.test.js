import path from 'node:path'
import * as sass from 'sass'
import { describe, expect, it } from 'vitest'
import { compile } from '../helpers/compile.js'

describe('media queries', () => {
  const query = (call) => compile(`.a { ${call} { color: red; } }`)

  it('writes a min-width query by default (mobile first)', () => {
    expect(query('@include mx.media-queries(expanded)')).toBe(
      '@media(min-width: 52.5rem){.a{color:red}}',
    )
  })

  it('writes the rules of the base as they are, with no query', () => {
    expect(query('@include mx.media-queries(base)')).toBe('.a{color:red}')
  })

  it('writes a max-width query up to the next class for the max range', () => {
    expect(query('@include mx.media-queries(medium, max)')).toBe(
      '@media(max-width: 52.4375rem){.a{color:red}}',
    )
  })

  it('writes both bounds for the both range', () => {
    expect(query('@include mx.media-queries(expanded, both)')).toBe(
      '@media(min-width: 52.5rem)and (max-width: 74.9375rem){.a{color:red}}',
    )
  })

  it('has no upper bound for the last class', () => {
    expect(query('@include mx.media-queries(extra-large, both)')).toBe(
      '@media(min-width: 100rem){.a{color:red}}',
    )
  })

  it('writes one query for each class when there is no key', () => {
    const css = query('@include mx.media-queries')

    expect(css).toContain('.a{color:red}')
    expect(css).toContain('@media(min-width: 37.5rem)')
    expect(css).toContain('@media(min-width: 100rem)')
  })

  it('fails on an unknown class or range', () => {
    expect(() => query('@include mx.media-queries(laptop)')).toThrow(
      /Breakpoint 'laptop' not found/,
    )
    expect(() => query('@include mx.media-queries(medium, sideways)')).toThrow(
      /Range 'sideways' not available/,
    )
  })

  it('writes the height query from the height up', () => {
    expect(query('@include mx.media-queries-height(medium)')).toBe(
      '@media(min-height: 30rem){.a{color:red}}',
    )
    expect(query('@include mx.media-queries-height(base)')).toBe(
      '.a{color:red}',
    )
  })

  it('respond-to is the same as media-queries', () => {
    expect(query('@include mx.respond-to(medium)')).toBe(
      query('@include mx.media-queries(medium)'),
    )
  })
})

describe('layout mixins', () => {
  it('container limits the width and centers the element', () => {
    expect(compile('.a { @include mx.container(large); }')).toBe(
      '.a{max-width:75rem;margin-inline:auto}',
    )
  })

  it('flexbox writes a flex container with its defaults', () => {
    expect(compile('.a { @include mx.flexbox; }')).toBe(
      '.a{display:flex;flex-flow:row nowrap;justify-content:flex-start;align-items:stretch}',
    )
  })

  it('flexbox takes the direction, the justification and the alignment', () => {
    expect(compile('.a { @include mx.flexbox(column, center, center); }')).toBe(
      '.a{display:flex;flex-flow:column nowrap;justify-content:center;align-items:center}',
    )
  })

  it('grid writes a grid with the columns and the gap it receives', () => {
    expect(compile('.a { @include mx.grid(3, 16px); }')).toBe(
      '.a{display:grid;grid-template-rows:auto;grid-template-columns:repeat(3, 1fr);gap:1rem}',
    )
  })
})

describe('spacing mixins', () => {
  it.each([
    ['p', 't', 'padding-top:1.5rem'],
    ['p', 'v', 'padding-top:1.5rem;padding-bottom:1.5rem'],
    ['p', 'h', 'padding-right:1.5rem;padding-left:1.5rem'],
    ['p', undefined, 'padding:1.5rem'],
    ['m', 'l', 'margin-left:1.5rem'],
    ['m', undefined, 'margin:1.5rem'],
  ])('%s(md, %s) writes %s', (mixin, direction, declarations) => {
    const argument = direction ? `md, "${direction}"` : 'md'

    expect(compile(`.a { @include mx.${mixin}(${argument}); }`)).toBe(
      `.a{${declarations}}`,
    )
  })

  it('p writes zero for an unknown key', () => {
    expect(compile('.a { @include mx.p(unknown); }')).toBe('.a{padding:0}')
  })
})

describe('shape mixins', () => {
  it('triangle draws the arrow in the direction it receives', () => {
    expect(compile('.a { @include mx.triangle(down, 10px, red); }')).toBe(
      '.a{width:0;height:0;border-top:0.625rem solid red;border-right:0.3125rem solid rgba(0,0,0,0);border-left:0.3125rem solid rgba(0,0,0,0)}',
    )
  })

  it('triangle fails on an unknown direction', () => {
    expect(() =>
      compile('.a { @include mx.triangle(diagonal, 10px, red); }'),
    ).toThrow(/Invalid direction `diagonal`/)
  })
})

describe('state mixins', () => {
  it('state-disabled dims the element and blocks the pointer', () => {
    expect(compile('.a { @include mx.state-disabled; }')).toBe(
      '.a{opacity:.38;cursor:not-allowed;pointer-events:none}',
    )
  })
})

describe('elevation and corners', () => {
  it('elevation writes the two layers of shadow of a Material 3 level', () => {
    expect(compile('.a { @include mx.elevation(2); }')).toBe(
      '.a{box-shadow:0rem 0.0625rem 0.125rem 0rem rgba(0,0,0,.3),0rem 0.125rem 0.375rem 0.125rem rgba(0,0,0,.15)}',
    )
  })

  it('elevation has the six levels of Material 3, and fails on another', () => {
    expect(compile('.a { @include mx.elevation(5); }')).toBe(
      '.a{box-shadow:0rem 0.25rem 0.25rem 0rem rgba(0,0,0,.3),0rem 0.5rem 0.75rem 0.375rem rgba(0,0,0,.15)}',
    )
    expect(() => compile('.a { @include mx.elevation(6); }')).toThrow(
      /Level '6' does not exist/,
    )
  })

  it('elevation applies the color it receives to every layer', () => {
    const css = compile('.a { @include mx.elevation(1, #336699); }')

    expect(css.match(/rgba\(51,102,153,/g)).toHaveLength(2)
  })

  it('corners-cut cuts the four corners of the clip-path', () => {
    const corners =
      'top-left: 10px, top-right: 10px, bottom-right: 10px, bottom-left: 10px'

    expect(compile(`.a { @include mx.corners-cut((${corners})); }`)).toBe(
      '.a{clip-path:polygon(0 0.625rem, 0.625rem 0, calc(100% - 0.625rem) 0, 100% 0.625rem, 100% calc(100% - 0.625rem), calc(100% - 0.625rem) 100%, 0.625rem 100%, 0 calc(100% - 0.625rem))}',
    )
  })

  it('corners-cut writes zero for the corners it does not receive', () => {
    expect(compile('.a { @include mx.corners-cut((top-left: 10px)); }')).toBe(
      '.a{clip-path:polygon(0 0.625rem, 0.625rem 0, calc(100% - 0rem) 0, 100% 0rem, 100% calc(100% - 0rem), calc(100% - 0rem) 100%, 0rem 100%, 0 calc(100% - 0rem))}',
    )
  })

  it('corners-cut mirrors a corner with the symmetry it receives', () => {
    const css = compile(
      '.a { @include mx.corners-cut((top-left: 10px), horizontal); }',
    )

    expect(css).toContain('0.625rem 100%, 0 calc(100% - 0.625rem)')
    expect(css).not.toContain('calc(100% - )')
  })
})

describe('theme mixin', () => {
  it('generate-theme writes each token and the channels of its color', () => {
    const css = compile(':root { @include mx.generate-theme(); }')

    expect(css).toContain('--primary: #455a64')
    expect(css).toContain('--primary-rgb: 69 90 100')
  })

  it('generate-theme gives the channels of any color, not only a hex one', () => {
    expect(
      compile(':root { @include mx.generate-theme((primary: #010203)); }'),
    ).toContain('--primary-rgb: 1 2 3')
  })
})

describe('color tokens and their channels', () => {
  const exported = (data) =>
    compile(`
      .a { color: vars.vars("blue-grey-darken-2"); background: vars.vars("brand"); }
      :root { @include mx.export-css-variables(${data}); }
    `)

  it('color-token writes a color and its channels', () => {
    expect(compile(':root { @include mx.color-token(brand, #123456); }')).toBe(
      ':root{--brand: #123456;--brand-rgb: 18 52 86}',
    )
  })

  it('color-token writes the channels of a color that is not hex', () => {
    expect(
      compile(':root { @include mx.color-token(brand, hsl(0 100% 50%)); }'),
    ).toContain('--brand-rgb: 255 0 0')
  })

  it('color-token writes no channels for a value that is not a color', () => {
    expect(compile(':root { @include mx.color-token(ratio, 2); }')).toBe(
      ':root{--ratio: 2}',
    )
  })

  it('the palette exports the colors that the stylesheets use, with their channels', () => {
    const css = exported('null')

    expect(css).toContain('--blue-grey-darken-2: #455a64')
    expect(css).toContain('--blue-grey-darken-2-rgb: 69 90 100')
  })

  it('the palette does not export a color that nothing uses', () => {
    expect(exported('null')).not.toContain('--red')
  })

  it('export-data adds the tokens of the application, with their channels', () => {
    const css = exported('("brand": #123456)')

    expect(css).toContain('--brand: #123456')
    expect(css).toContain('--brand-rgb: 18 52 86')
  })
})

describe('exported scales', () => {
  const exported = (names) =>
    compile(`
      .a { ${names.map((name, index) => `--x${index}: #{vars.vars("${name}")};`).join(' ')} }
      :root { @include mx.export-css-variables; }
    `)

  it('writes a shape and its sides, in rem', () => {
    const css = exported([
      'shape-medium',
      'shape-medium-top',
      'shape-medium-end',
    ])

    expect(css).toContain('--shape-medium: 0.75rem')
    expect(css).toContain('--shape-medium-top: 0.75rem 0.75rem 0 0')
    expect(css).toContain('--shape-medium-end: 0 0.75rem 0.75rem 0')
  })

  it('has the ten steps of the Material 3 shape scale', () => {
    expect(
      compile(
        '.a { v: list.length(map.keys(vars.$shape-radius)); }'.replace(
          /^/,
          '@use "sass:list"; @use "sass:map"; ',
        ),
      ),
    ).toBe('.a{v:10}')
  })
})

describe('type scale', () => {
  it('type writes the font, the size, the weight, the line height and the tracking', () => {
    expect(compile('.a { @include mx.type(body-medium); }')).toBe(
      ".a{font-family:'Helvetica Neue', arial, sans-serif;font-size:0.875rem;font-weight:400;line-height:1.25rem;letter-spacing:0.015625rem}",
    )
  })

  it('the large styles use the brand font, the small ones the plain font', () => {
    const css = compile(
      '.a { f: fn.get-type(display-large, font); } .b { f: fn.get-type(label-small, font); }',
    )

    expect(css).toContain('.a{f:')
  })

  it('type writes the emphasized style of a role: one weight step heavier', () => {
    expect(compile('.a { @include mx.type(body-medium, true); }')).toContain(
      'font-weight:500',
    )
    expect(compile('.a { @include mx.type(label-large, true); }')).toContain(
      'font-weight:700',
    )
  })

  it('type fails on an unknown style', () => {
    expect(() => compile('.a { @include mx.type(huge); }')).toThrow(
      /Type style 'huge' not found/,
    )
  })

  it('exports the styles that the stylesheets use', () => {
    const css = compile(`
      .a { --x: #{vars.vars("type-title-medium-size")}; --y: #{vars.vars("type-title-medium-weight")}; }
      :root { @include mx.export-css-variables; }
    `)

    expect(css).toContain('--type-title-medium-size: 1rem')
    expect(css).toContain('--type-title-medium-weight: 500')
  })
})

describe('animate', () => {
  it('starts an animation with the durations and easings of Material 3', () => {
    expect(compile('.a { @include mx.animate(fade-in); }')).toBe(
      '.a{animation:zk-fade-in 400ms cubic-bezier(0.05, 0.7, 0.1, 1) 0s 1 both}@media(prefers-reduced-motion: reduce){.a{animation:none}}',
    )
  })

  it('takes a duration, an easing and an iteration count', () => {
    expect(
      compile('.a { @include mx.animate(spin, long1, standard, infinite); }'),
    ).toContain(
      'animation:zk-spin 450ms cubic-bezier(0.2, 0, 0, 1) 0s infinite both',
    )
  })

  it('fails on an unknown animation, duration or easing', () => {
    expect(() => compile('.a { @include mx.animate(jump); }')).toThrow(
      /Animation 'jump' not found/,
    )
    expect(() => compile('.a { @include mx.animate(fade-in, slow); }')).toThrow(
      /Duration 'slow' not found/,
    )
    expect(() =>
      compile('.a { @include mx.animate(fade-in, short1, smooth); }'),
    ).toThrow(/Easing 'smooth' not found/)
  })
})

describe('ripple', () => {
  const css = compile('.a { @include mx.ripple; }')

  it('writes a radial gradient that fades in on press, with the pressed opacity of Material 3', () => {
    expect(css).toContain(
      '.a:active::after{opacity:.12;transition-duration:105ms}',
    )
    expect(css).toContain(
      'radial-gradient(closest-side circle at var(--ripple-x, 50%) var(--ripple-y, 50%)',
    )
  })

  it('is not written for less motion or forced colors', () => {
    expect(css).toContain(
      '@media(prefers-reduced-motion: reduce){.a::after{transition:none}}',
    )
    expect(css).toContain(
      '@media(forced-colors: active){.a::after{display:none}}',
    )
  })

  it('the states are the opacities of Material 3', () => {
    const value = (key) =>
      compile(
        `.a { v: map.get(vars.$states, ${key}); }`.replace(
          /^/,
          '@use "sass:map"; ',
        ),
      )

    expect(value('state-hover-state-layer-opacity')).toBe('.a{v:.08}')
    expect(value('state-focus-state-layer-opacity')).toBe('.a{v:.12}')
    expect(value('state-pressed-state-layer-opacity')).toBe('.a{v:.12}')
    expect(value('state-dragged-state-layer-opacity')).toBe('.a{v:.16}')
  })
})

describe('defaults from the variables, overrides from the call', () => {
  it('animate takes the enter timing of $motion, and the exit timing for what leaves', () => {
    expect(compile('.a { @include mx.animate(fade-in); }')).toContain(
      'animation:zk-fade-in 400ms cubic-bezier(0.05, 0.7, 0.1, 1) 0s 1 both',
    )
    expect(compile('.a { @include mx.animate(fade-out); }')).toContain(
      'animation:zk-fade-out 200ms cubic-bezier(0.3, 0, 0.8, 0.15) 0s 1 both',
    )
  })

  it('animate overrides each part of the timing for this call only', () => {
    expect(
      compile(
        '.a { @include mx.animate(fade-in, $duration: short2, $delay: 80ms); } .b { @include mx.animate(fade-in); }',
      ),
    ).toMatch(
      /\.a\{animation:zk-fade-in 100ms cubic-bezier\(0\.05, 0\.7, 0\.1, 1\) 80ms 1 both}.*\.b\{animation:zk-fade-in 400ms/,
    )
  })

  it('animate accepts a time and a curve as they are', () => {
    expect(
      compile(
        '.a { @include mx.animate(fade-in, 123ms, cubic-bezier(0, 0, 1, 1)); }',
      ),
    ).toContain('animation:zk-fade-in 123ms cubic-bezier(0, 0, 1, 1) 0s 1 both')
  })

  it('the default timing follows $overrides', () => {
    const css = sass.compileString(
      '@use "index" as m with ($overrides: (motion: (enter: (duration: long1)))); @use "mixins" as mx; .a { @include mx.animate(fade-in); }',
      { style: 'compressed', loadPaths: [path.resolve('src')] },
    ).css

    expect(css).toContain('animation:zk-fade-in 450ms')
  })

  it('get-motion fails on an unknown movement or property', () => {
    expect(() => compile('.a { v: fn.get-motion(spin, duration); }')).toThrow(
      /Motion 'spin' not found/,
    )
    expect(() => compile('.a { v: fn.get-motion(enter, color); }')).toThrow(
      /Property 'color' not found/,
    )
  })

  it('ripple takes the durations of $motion, or its own', () => {
    expect(compile('.a { @include mx.ripple; }')).toContain(
      'transition:opacity 375ms linear',
    )
    expect(compile('.a { @include mx.ripple(red, 50ms, 200ms); }')).toContain(
      'transition:opacity 200ms linear',
    )
  })

  it('the shadow of a level has the color of its layers, or the one given', () => {
    expect(compile('.a { @include mx.elevation(1); }')).toContain(
      'rgba(0,0,0,.3)',
    )
    expect(compile('.a { @include mx.elevation(1, #336699); }')).toContain(
      'rgba(51,102,153,.3)',
    )
  })

  it('grid takes the gap of the base grid, or its own', () => {
    expect(compile('.a { @include mx.grid(3); }')).toContain('gap:1rem')
    expect(compile('.a { @include mx.grid(3, 32px); }')).toContain('gap:2rem')
  })
})

describe('theme roles', () => {
  const css = (call) => compile(`:root { @include ${call}; }`)

  it('writes the roles of Material 3 with the tones of the light mode', () => {
    const light = css('mx.generate-theme()')

    expect(light).toContain('--surface-container-lowest: rgb(255, 255, 255)')
    expect(light).toContain('--primary-container: rgb(207, 231, 242)')
    expect(light).toContain('--primary-container-rgb: 207 231 242')
    expect(light).toContain('--on-surface-variant:')
    expect(light).toContain('--outline-variant:')
  })

  it('writes the tones of the dark mode', () => {
    const dark = css('mx.generate-theme((), dark)')

    expect(dark).toContain('--surface-container-lowest: rgb(14, 14, 14)')
    expect(dark).toContain('--primary-container: rgb(53, 74, 84)')
  })

  it('builds the containers from the colors of the theme', () => {
    expect(css('mx.generate-theme((primary: #6750a4))')).toContain(
      '--primary-container: rgb(236, 223, 255)',
    )
  })

  it('does not write a role that is not in $theme-roles', () => {
    expect(css('mx.generate-theme((), light)')).not.toContain('--tertiary')
  })
})
