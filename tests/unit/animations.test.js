import { describe, expect, it } from 'vitest'
import { compileFile } from '../helpers/compile.js'

describe('animations stylesheet', () => {
  const css = compileFile('animations.scss')

  it('writes the keyframes', () => {
    expect(css).toContain('@keyframes zk-fade-in{from{opacity:0}}')
    expect(css).toContain('@keyframes zk-spin{to{transform:rotate(360deg)}}')
  })

  it('writes a class for each animation, entering slow and leaving fast', () => {
    expect(css).toContain('var(--animate-duration, 400ms)')
    expect(css).toContain('var(--animate-duration, 200ms)')
  })

  it('lets each animation of each element have its own timing', () => {
    const rule = css.match(/\.animate-fade-in\{[^}]*}/)[0]

    expect(rule).toContain(
      'var(--animate-fade-in-duration, var(--animate-duration, 400ms))',
    )
    expect(rule).toContain(
      'var(--animate-fade-in-easing, var(--animate-easing, cubic-bezier(0.05, 0.7, 0.1, 1)))',
    )
    expect(rule).toContain(
      'var(--animate-fade-in-delay, var(--animate-delay, 0s))',
    )
  })

  it('does not let a parent change the timing of its children', () => {
    expect(css).toContain(
      '@property --animate-duration{inherits:false;syntax:"*"}',
    )
  })

  it('has a class for each duration, easing and delay of Material 3', () => {
    expect(css).toContain('.animate-duration-short2{--animate-duration: 100ms}')
    expect(css).toContain('.animate-delay-medium1{--animate-delay: 250ms}')
    expect(css).toContain(
      '.animate-easing-standard{--animate-easing: cubic-bezier(0.2, 0, 0, 1)}',
    )
    expect(css).toContain('.animate-infinite{--animate-iteration: infinite}')
  })

  it('keeps the animations that go on turning with their own defaults', () => {
    expect(css).toContain(
      'var(--animate-spin-duration, var(--animate-duration, 1s))',
    )
    expect(css).toContain(
      'var(--animate-spin-iteration, var(--animate-iteration, infinite))',
    )
  })

  it('swaps the slides from the start and the end in a right-to-left page', () => {
    expect(css).toContain(
      ':dir(rtl) .animate-slide-start-in{animation-name:zk-slide-end-in}',
    )
  })

  it('stops for the readers who want less motion', () => {
    expect(css).toContain(
      '@media(prefers-reduced-motion: reduce){[class*=animate-]{animation:none !important}}',
    )
  })
})
