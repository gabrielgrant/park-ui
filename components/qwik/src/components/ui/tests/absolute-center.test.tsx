import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { AbsoluteCenter } from '../absolute-center'
import { ComponentUnderTest } from './absolute-center.fixtures'

describe('AbsoluteCenter (styled, SSR)', () => {
  it('applies the recipe class', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    const el = document.querySelector('[data-testid="center"]')
    expect(el?.tagName).toBe('DIV')
    expect(el?.getAttribute('class')).toContain('absolute-center')
    expect(el?.textContent).toBe('Centered')
  })

  it('applies the axis variant', async () => {
    const { document } = await ssrRenderToDom(
      <AbsoluteCenter axis="horizontal" data-testid="c" />,
      {
        qwikLoader: true,
      },
    )
    expect(document.querySelector('[data-testid="c"]')?.getAttribute('class')).toContain(
      'absolute-center--axis_horizontal',
    )
  })
})
