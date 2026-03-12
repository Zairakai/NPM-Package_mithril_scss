import path from 'path'
import * as sass from 'sass'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'

const srcPath = (base) => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  return path.resolve(__dirname, base)
}

describe('mithril scss', () => {
  it('compiles the main entry without errors', () => {
    const entry = srcPath('../../src/index.scss')

    // The index only uses @forward (no direct CSS output) — compile must succeed
    let result
    expect(() => {
      result = sass.compile(entry, { style: 'expanded' })
    }).not.toThrow()

    expect(typeof result.css).toBe('string')
  })

  it('compiles grid module and produces CSS output', () => {
    const entry = srcPath('../../src/grid.scss')

    let result
    expect(() => {
      result = sass.compile(entry, { style: 'expanded' })
    }).not.toThrow()

    expect(typeof result.css).toBe('string')
  })

  it('compiles spacing module', () => {
    const entry = srcPath('../../src/spacing.scss')

    let result
    expect(() => {
      result = sass.compile(entry, { style: 'expanded' })
    }).not.toThrow()

    expect(typeof result.css).toBe('string')
  })

  it('shape mixin — symmetry: diagonal mirrors top-left to bottom-right', () => {
    // medium = 12px → 0.75rem
    let result
    expect(() => {
      result = sass.compileString(`@use "mixins" as mx; .x { @include mx.shape("medium", "top-left", "diagonal"); }`, {
        style: 'compressed',
        loadPaths: [srcPath('../../src')],
      })
    }).not.toThrow()
    expect(result.css).toContain('border-radius:0.75rem 0 0.75rem 0')
  })

  it('shape mixin — symmetry: horizontal mirrors top-left to bottom-left', () => {
    // large = 16px → 1rem
    let result
    expect(() => {
      result = sass.compileString(`@use "mixins" as mx; .x { @include mx.shape("large", "top-left", "horizontal"); }`, {
        style: 'compressed',
        loadPaths: [srcPath('../../src')],
      })
    }).not.toThrow()
    expect(result.css).toContain('border-radius:1rem 0 0 1rem')
  })

  it('shape mixin — symmetry: vertical mirrors top-left to top-right', () => {
    // medium = 12px → 0.75rem
    let result
    expect(() => {
      result = sass.compileString(`@use "mixins" as mx; .x { @include mx.shape("medium", "top-left", "vertical"); }`, {
        style: 'compressed',
        loadPaths: [srcPath('../../src')],
      })
    }).not.toThrow()
    expect(result.css).toContain('border-radius:0.75rem 0.75rem 0 0')
  })

  it('shape mixin — symmetry: diagonal on bottom-right mirrors to top-left', () => {
    // extra-small = 4px → 0.25rem
    let result
    expect(() => {
      result = sass.compileString(
        `@use "mixins" as mx; .x { @include mx.shape("extra-small", "bottom-right", "diagonal"); }`,
        { style: 'compressed', loadPaths: [srcPath('../../src')] }
      )
    }).not.toThrow()
    expect(result.css).toContain('border-radius:0.25rem 0 0.25rem 0')
  })

  it('heading mixin — applies margin, padding, line-height, font-weight, letter-spacing', () => {
    let result
    expect(() => {
      result = sass.compileString(`@use "mixins" as mx; h1 { @include mx.heading(1); }`, {
        style: 'compressed',
        loadPaths: [srcPath('../../src')],
      })
    }).not.toThrow()
    expect(result.css).toContain('font-weight:300')
    expect(result.css).toContain('letter-spacing:-1.5px')
  })

  it('font-size mixin — applies rem-converted font-size', () => {
    let result
    expect(() => {
      result = sass.compileString(`@use "mixins" as mx; .x { @include mx.font-size(24); }`, {
        style: 'compressed',
        loadPaths: [srcPath('../../src')],
      })
    }).not.toThrow()
    // 24px / 16px = 1.5rem
    expect(result.css).toContain('font-size:1.5rem')
  })

  it('text-fluid mixin — outputs clamp()', () => {
    let result
    expect(() => {
      result = sass.compileString(`@use "mixins" as mx; .x { @include mx.text-fluid("base"); }`, {
        style: 'compressed',
        loadPaths: [srcPath('../../src')],
      })
    }).not.toThrow()
    expect(result.css).toContain('font-size:clamp(')
    expect(result.css).toContain('vw')
  })

  it('line-height mixin — applies unitless ratio as-is', () => {
    let result
    expect(() => {
      result = sass.compileString(`@use "mixins" as mx; .x { @include mx.line-height("base"); }`, {
        style: 'compressed',
        loadPaths: [srcPath('../../src')],
      })
    }).not.toThrow()
    // base = 1.2 (unitless)
    expect(result.css).toContain('line-height:1.2')
  })

  it('line-height mixin — converts px value to rem', () => {
    let result
    expect(() => {
      result = sass.compileString(`@use "mixins" as mx; .x { @include mx.line-height("large"); }`, {
        style: 'compressed',
        loadPaths: [srcPath('../../src')],
      })
    }).not.toThrow()
    // large = 20px → 1.25rem
    expect(result.css).toContain('line-height:1.25rem')
  })

  it('state-layer mixin — outputs pseudo-element with opacity', () => {
    let result
    expect(() => {
      result = sass.compileString(`@use "mixins" as mx; .x { @include mx.state-layer("hover"); }`, {
        style: 'compressed',
        loadPaths: [srcPath('../../src')],
      })
    }).not.toThrow()
    expect(result.css).toContain('position:relative')
    expect(result.css).toContain('opacity:.08')
    expect(result.css).toContain('pointer-events:none')
  })

  it('state-disabled mixin — outputs disabled opacity and pointer-events', () => {
    let result
    expect(() => {
      result = sass.compileString(`@use "mixins" as mx; .x { @include mx.state-disabled(); }`, {
        style: 'compressed',
        loadPaths: [srcPath('../../src')],
      })
    }).not.toThrow()
    expect(result.css).toContain('opacity:.38')
    expect(result.css).toContain('pointer-events:none')
    expect(result.css).toContain('cursor:not-allowed')
  })

  it('generate-theme mixin — outputs primary and primary-rgb CSS vars', () => {
    let result
    expect(() => {
      result = sass.compileString(`@use "mixins" as mx; :root { @include mx.generate-theme(); }`, {
        style: 'compressed',
        loadPaths: [srcPath('../../src')],
      })
    }).not.toThrow()
    // blue-grey / darken-2 = #455a64 (sober neutral default)
    expect(result.css).toContain('--primary: #455a64')
    expect(result.css).toContain('--primary-rgb: 69 90 100')
    expect(result.css).toContain('--on-primary: #fff')
    expect(result.css).toContain('--error: #f44336')
  })

  it('generate-theme mixin — accepts partial overrides', () => {
    let result
    expect(() => {
      result = sass.compileString(
        `@use "mixins" as mx; :root { @include mx.generate-theme((primary: #ff5722, on-primary: #fff)); }`,
        { style: 'compressed', loadPaths: [srcPath('../../src')] }
      )
    }).not.toThrow()
    expect(result.css).toContain('--primary: #ff5722')
    expect(result.css).toContain('--primary-rgb: 255 87 34')
    // non-overridden token still present
    expect(result.css).toContain('--secondary:')
  })

  it('theme function — returns var() reference', () => {
    let result
    expect(() => {
      result = sass.compileString(`@use "functions" as fn; .x { background: fn.theme("primary"); }`, {
        style: 'compressed',
        loadPaths: [srcPath('../../src')],
      })
    }).not.toThrow()
    expect(result.css).toContain('background:var(--primary)')
  })

  it('get-color function — retrieves color from $colors by name and variant', () => {
    let result
    expect(() => {
      result = sass.compileString(
        `@use "functions" as fn; .x { color: fn.get-color("red"); background: fn.get-color("blue", "darken-2"); }`,
        { style: 'compressed', loadPaths: [srcPath('../../src')] }
      )
    }).not.toThrow()
    expect(result.css).toContain('color:#f44336')
    expect(result.css).toContain('background:#1976d2')
  })
})
