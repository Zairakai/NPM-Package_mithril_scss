import { describe, expect, it } from 'vitest'
import { compile } from '../helpers/compile.js'

const value = (expression) =>
  compile(`.x { v: ${expression}; }`).replace(/^\.x\{v:|\}$/g, '')

describe('unit functions', () => {
  it('strip-unit removes the unit', () => {
    expect(value('fn.strip-unit(16px)')).toBe('16')
  })

  it('px-to-rem converts a pixel value with the default font size', () => {
    expect(value('fn.px-to-rem(24px)')).toBe('1.5rem')
  })

  it('px-to-rem converts each value of a list', () => {
    expect(value('fn.px-to-rem(8px 16px)')).toBe('0.5rem 1rem')
  })

  it('px-to-rem accepts another base font size', () => {
    expect(value('fn.px-to-rem(20px, (base-font-size: 10px))')).toBe('2rem')
  })

  it('px-to-rem keeps zero as it is', () => {
    expect(value('fn.px-to-rem(0)')).toBe('0')
  })

  it('calc-rem converts with the base font size it receives', () => {
    expect(value('fn.calc-rem(32px, 16px)')).toBe('2rem')
  })

  it('calculate-fluid-font writes a clamp() between the two sizes', () => {
    expect(value('fn.calculate-fluid-font(16px, 2vw, 24px)')).toBe(
      'clamp(1rem,2vw,1.5rem)',
    )
  })

  it('ratio gives the padding of an aspect ratio', () => {
    expect(value('fn.ratio(16, 9)')).toBe('56.25%')
  })
})

describe('token functions', () => {
  it('get-spacing returns the spacing in rem, or in px on demand', () => {
    expect(value('fn.get-spacing("md")')).toBe('1.5rem')
    expect(value('fn.get-spacing("md", true)')).toBe('24px')
  })

  it('get-spacing accepts a numeric key', () => {
    expect(value('fn.get-spacing(8)')).toBe('0.5rem')
  })

  it('get-spacing fails on an unknown key', () => {
    expect(() => value('fn.get-spacing("unknown")')).toThrow(
      /Spacing key 'unknown' not found/,
    )
  })

  it('get-line-height returns a ratio as it is and a length as it is', () => {
    expect(value('fn.get-line-height(base)')).toBe('1.2')
    expect(value('fn.get-line-height(large)')).toBe('20px')
  })

  it('get-heading returns the properties of a level', () => {
    expect(value('fn.get-heading(1, line-height)')).toBe('2.5rem')
    expect(value('fn.get-heading(1, margin)')).toBe('0rem 0rem 1rem 0rem')
  })

  it('get-heading takes the text properties from its style of the type scale', () => {
    expect(value('fn.get-heading(1, role)')).toBe('headline-large')
    expect(value('fn.get-heading(5, weight)')).toBe('500')
    expect(value('fn.get-heading(5, spacing)')).toBe('0.009375rem')
  })

  it('get-type gives a property of a style, in rem', () => {
    expect(value('fn.get-type(body-large, size)')).toBe('1rem')
    expect(value('fn.get-type(display-large, line-height)')).toBe('4rem')
    expect(value('fn.get-type(label-small, weight)')).toBe('500')
  })

  it('get-type fails on an unknown style or property', () => {
    expect(() => value('fn.get-type(huge, size)')).toThrow(
      /Type style 'huge' not found/,
    )
    expect(() => value('fn.get-type(body-large, color)')).toThrow(
      /Property 'color' not found/,
    )
  })

  it('get-container returns the width in rem, or the full width for the base', () => {
    expect(value('fn.get-container(large)')).toBe('75rem')
    expect(value('fn.get-container(base)')).toBe('100%')
  })

  it('get-container fails on an unknown class', () => {
    expect(() => value('fn.get-container(unknown)')).toThrow(
      /Container 'unknown' not found/,
    )
  })

  it('get-grid returns the columns, the gap and the margin of a class', () => {
    expect(value('fn.get-grid(medium, cols)')).toBe('8')
    expect(value('fn.get-grid(expanded, gap)')).toBe('1.5rem')
    expect(value('fn.get-grid(base, margin)')).toBe('1rem')
  })

  it('get-grid fails on an unknown class or property', () => {
    expect(() => value('fn.get-grid(large, cols)')).toThrow(
      /Grid 'large' not found/,
    )
    expect(() => value('fn.get-grid(medium, unknown)')).toThrow(
      /Property 'unknown' not found/,
    )
  })

  it('breakpoint-min and breakpoint-max give the bounds of a class', () => {
    expect(value('fn.breakpoint-min(medium)')).toBe('600px')
    expect(value('fn.breakpoint-max(medium)')).toBe('839px')
    expect(value('fn.breakpoint-max(extra-large) == null')).toBe('true')
  })

  it('breakpoint-min fails on an unknown class', () => {
    expect(() => value('fn.breakpoint-min(laptop)')).toThrow(
      /Breakpoint 'laptop' not found/,
    )
  })

  it('get-value-from-map reads a nested value', () => {
    expect(value('fn.get-value-from-map((a: (b: 1px)), a, b)')).toBe('1px')
  })

  it('theme returns the reference of a custom property', () => {
    expect(value('fn.theme(primary)')).toBe('var(--primary)')
  })
})

describe('color functions', () => {
  it('color-rgb returns the color from its channels', () => {
    expect(value('fn.color-rgb(#336699)')).toBe('#369')
  })

  it('color-legibility picks the dark color on a light background', () => {
    expect(value('fn.color-legibility(#ffffff, #000000, #ffffff)')).toBe('#000')
  })

  it('color-legibility picks the light color on a dark background', () => {
    expect(value('fn.color-legibility(#000000, #000000, #ffffff)')).toBe('#fff')
  })

  it('color-alpha applies a ratio as the alpha of the color', () => {
    expect(value('fn.color-alpha(#336699, 0.25)')).toBe('rgba(51,102,153,.25)')
  })

  it('color-alpha applies a percentage as the alpha of the color', () => {
    expect(value('fn.color-alpha(#336699, 25%)')).toBe('rgba(51,102,153,.25)')
  })

  it('color-alpha makes the color half transparent by default', () => {
    expect(value('fn.color-alpha(#336699)')).toBe('rgba(51,102,153,.5)')
  })

  it('color-alpha does not touch the channels of a black color', () => {
    expect(value('fn.color-alpha(#000, 0.2)')).toBe('rgba(0,0,0,.2)')
  })

  it('color-lisibility still works as the old name of color-legibility', () => {
    expect(value('fn.color-lisibility(#ffffff, #000000, #ffffff)')).toBe('#000')
  })

  it('color-tone-of measures how light a color looks, from 0 to 100', () => {
    expect(value('fn.color-tone-of(#fff)')).toBe('100')
    expect(value('fn.color-tone-of(#000)')).toBe('0')
    expect(Number(value('fn.color-tone-of(#777)'))).toBeCloseTo(50, 0)
  })

  it('color-tone gives a color of the tone asked, with the hue of the one given', () => {
    // The baseline primary of Material 3 is tone 40 of its own hue: within a unit per channel.
    expect(value('fn.color-tone(#6750a4, 40)')).toBe('#6851a5')
    expect(value('fn.color-tone(#6750a4, 90)')).toBe('#ecdfff')
    expect(value('fn.color-tone(#9e9e9e, 100)')).toBe('#fff')
    expect(value('fn.color-tone(#9e9e9e, 0)')).toBe('#000')
  })

  it('color-tone fails on a tone out of range', () => {
    expect(() => value('fn.color-tone(#fff, 120)')).toThrow(
      /The tone must be between 0 and 100/,
    )
  })
})
