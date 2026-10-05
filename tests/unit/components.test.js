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
    expect(css).toMatch(/@media \(prefers-color-scheme: dark\)\s*{\s*:root:not\(\[data-theme=light]\)/)
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
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)\s*{\s*\.skeleton\s*{\s*animation: none/)
  })

  it('can leave the tokens to the application', () => {
    const without = compile('@use "src/components" with ($emit-tokens: false);')

    expect(without).not.toMatch(/--zk-success:/)
    expect(without).toContain('.card-header')
  })

  it('can change the dark palette', () => {
    const custom = compile(
      '@use "src/components" with ($dark-theme: (primary: #ff5722, on-primary: #000, surface: #000, on-surface: #fff, background: #000, on-background: #fff, error: #f00, on-error: #fff));'
    )

    expect(custom).toMatch(/--primary: #ff5722/)
    expect(custom).toMatch(/--surface: #000/)
  })
})
