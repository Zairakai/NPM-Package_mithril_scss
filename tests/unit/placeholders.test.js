import { createRequire } from 'module'
import path from 'path'
import * as sass from 'sass'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'

const here = path.dirname(fileURLToPath(import.meta.url))
const entry = path.resolve(here, '../../src/components/index.scss')
const compile = (source) =>
  sass.compileString(source, {
    style: 'expanded',
    loadPaths: [path.resolve(here, '../..')],
  }).css

describe('component styles', () => {
  const css = sass.compile(entry, { style: 'expanded' }).css

  it('compiles without error', () => {
    expect(css.length).toBeGreaterThan(10000)
  })

  it('writes the tokens for light and for dark', () => {
    expect(css).toMatch(/:root\s*{[^}]*--primary:/)
    expect(css).toMatch(/:root\[data-theme=dark]\s*{[^}]*--surface: #1e1e1e/)
    expect(css).toMatch(
      /@media \(prefers-color-scheme: dark\)\s*{\s*:root:not\(\[data-theme=light]\)/,
    )
    expect(css).toContain('color-scheme: dark')
    expect(css).toContain('--primary-rgb')
  })

  it.each([
    '.card-header',
    '.accordion-trigger',
    '.alert',
    '.toast-container',
    '.tab[aria-selected=true]',
    '.pagination-item[aria-current=page]',
    '.modal::backdrop',
    '.data-table-sort',
    '.combobox-option[data-active]',
    '.calendar-day[data-selected]',
    '.file-dropzone[data-dragging]',
    '.code-block-pre',
    '.theme-switcher-option[aria-pressed=true]',
  ])('styles %s', (selector) => {
    expect(css).toContain(selector)
  })

  it('uses the tokens and not fixed colors for the surfaces', () => {
    expect(css).toMatch(/\.card\s*{[^}]*background: var\(--surface\)/)
    expect(css).toMatch(/\.card\s*{[^}]*border: 1px solid var\(--zk-border\)/)
  })

  it('respects the visitors who want less motion', () => {
    expect(css).toMatch(
      /@media \(prefers-reduced-motion: reduce\)\s*{\s*\.skeleton\s*{\s*animation: none/,
    )
  })

  it('can leave the tokens to the application', () => {
    const without = compile('@use "src/components" with ($emit-tokens: false);')

    expect(without).not.toMatch(/--zk-success:/)
    expect(without).toContain('.card-header')
  })

  it('can change the dark palette', () => {
    const custom = compile(
      '@use "src/components" with ($dark-theme: (primary: #ff5722, on-primary: #000, surface: #000, on-surface: #fff, background: #000, on-background: #fff, error: #f00, on-error: #fff));',
    )

    expect(custom).toMatch(/--primary: #ff5722/)
    expect(custom).toMatch(/--surface: #000/)
  })
})

describe('scoped component styles', () => {
  const scoped = compile('@use "src/components" with ($scope: ".demo");')

  it('writes the tokens on the scope and not on the page', () => {
    expect(scoped).toMatch(/^\.demo\s*{[^}]*--primary:/m)
    expect(scoped).not.toMatch(/^:root\s*{/m)
  })

  it('writes the dark tokens under the scope', () => {
    expect(scoped).toMatch(
      /:root\[data-theme=dark] \.demo\s*{[^}]*--surface: #1e1e1e/,
    )
    expect(scoped).toMatch(
      /:root:not\(\[data-theme=light]\) \.demo\s*{[^}]*--surface: #1e1e1e/,
    )
  })

  it('writes the rules of the components under the scope only', () => {
    expect(scoped).toMatch(/\.demo \.card-header/)
    expect(scoped).toMatch(/\.demo \.modal::backdrop/)
    expect(scoped).not.toMatch(/^\.card-header/m)
  })
})

describe('exports of the package', () => {
  const resolve = createRequire(import.meta.url).resolve

  it.each([
    'functions',
    'mixins',
    'variables',
    'placeholders',
    'grid',
    'spacing',
  ])('exposes src/%s, with and without the extension', (name) => {
    expect(resolve(`@zairakai/mithril-scss/src/${name}`)).toMatch(
      new RegExp(`src/${name}\\.scss$`),
    )
    expect(resolve(`@zairakai/mithril-scss/src/${name}.scss`)).toMatch(
      new RegExp(`src/${name}\\.scss$`),
    )
  })

  it('still exposes the entry, the bases and the component styles', () => {
    expect(resolve('@zairakai/mithril-scss')).toMatch(/src\/index\.scss$/)
    expect(resolve('@zairakai/mithril-scss/bases/reset.scss')).toMatch(
      /src\/bases\/reset\.scss$/,
    )
    expect(resolve('@zairakai/mithril-scss/components')).toMatch(
      /src\/components\/index\.scss$/,
    )
  })
  describe('tokens', () => {
    it('writes the sizes in rem, from the base font size', () => {
      const css = sass.compile(entry, { style: 'expanded' }).css

      expect(css).toContain('--zk-space-2: 0.5rem')
      expect(css).toContain('--zk-radius: 0.5rem')
      expect(css).not.toMatch(/--zk-(space|radius)[a-z0-9-]*: [0-9.]+px/)
    })

    it('writes the durations', () => {
      const css = sass.compile(entry, { style: 'expanded' }).css

      expect(css).toContain('--zk-duration: 150ms')
      expect(css).toContain('animation: zk-skeleton var(--zk-duration-loop)')
    })
  })

  describe('motion', () => {
    const css = sass.compile(entry, { style: 'expanded' }).css

    it('writes the enter and exit tokens of Material 3', () => {
      expect(css).toContain('--zk-duration-enter: 400ms')
      expect(css).toContain('--zk-duration-exit: 200ms')
      expect(css).toContain(
        '--zk-easing-enter: cubic-bezier(0.05, 0.7, 0.1, 1)',
      )
      expect(css).toContain('--zk-easing-exit: cubic-bezier(0.3, 0, 0.8, 0.15)')
    })

    it('animates a dialog in and out with CSS only', () => {
      expect(css).toMatch(/\.modal:is\(dialog\)\[open]\s*{[^}]*opacity: 1/)
      expect(css).toContain('allow-discrete')
      expect(css).toContain('@starting-style')
    })

    it('stops the transitions for the readers who want less motion', () => {
      expect(css).toMatch(
        /prefers-reduced-motion: reduce\)\s*{\s*\.modal:is\(dialog\)[^}]*transition: none/,
      )
    })
  })

  describe('accessibility', () => {
    const css = sass.compile(entry, { style: 'expanded' }).css

    it('writes the state layers with the opacities of Material 3', () => {
      expect(css).toContain('--zk-hover: rgb(var(--on-surface-rgb) / 8%)')
      expect(css).toContain('--zk-pressed: rgb(var(--on-surface-rgb) / 12%)')
    })

    it('strengthens the borders when more contrast is asked', () => {
      expect(css).toMatch(
        /prefers-contrast: more\)\s*{[^}]*--zk-border: rgb\(var\(--on-surface-rgb\) \/ 60%\)/,
      )
    })

    it('uses the system colors in forced colors', () => {
      expect(css).toMatch(
        /forced-colors: active\)\s*{[^}]*--zk-border: CanvasText[^}]*--zk-focus: Highlight/,
      )
    })

    it('has a ripple class', () => {
      expect(css).toMatch(/\.ripple:active::after\s*{[^}]*opacity: 0\.12/)
    })
  })

  describe('reset', () => {
    const withSettings = (settings) =>
      compile(`@use "src/components"${settings};`)

    it('is written by default, before the components', () => {
      const css = withSettings('')

      expect(css).toContain('box-sizing: border-box')
      expect(css.indexOf('box-sizing: border-box')).toBeLessThan(
        css.indexOf('.accordion'),
      )
    })

    it('is left out with $reset: false', () => {
      expect(withSettings(' with ($reset: false)')).not.toContain(
        'box-sizing: border-box',
      )
    })

    it('is left out when the styles are limited to an element', () => {
      expect(withSettings(' with ($scope: ".demo")')).not.toContain(
        'box-sizing: border-box',
      )
    })
  })

  describe('element separator', () => {
    const css = sass.compile(entry, { style: 'expanded' }).css

    const withSeparator = (separator) =>
      compile(
        `@use "src/components" with ($element-separator: "${separator}");`,
      )

    it('joins the elements with a dash by default', () => {
      expect(css).toContain('.alert-title')
      expect(css).not.toContain('.alert__title')
    })

    it('joins them with the configured separator', () => {
      const bem = withSeparator('__')

      expect(bem).toContain('.alert__title')
      expect(bem).toContain('.alert__close')
      expect(bem).not.toContain('.alert-title')
    })

    it('applies it to the compound selectors too', () => {
      const bem = withSeparator('__')

      expect(bem).toMatch(
        /\.splitter\[data-direction=horizontal] > \.splitter__handle/,
      )
    })

    it('keeps the same number of rules whatever the separator', () => {
      const count = (text) => (text.match(/{/g) ?? []).length

      expect(count(withSeparator('__'))).toBe(count(css))
    })
  })
})
