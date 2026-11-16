import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest, TextAs } from './text.fixtures'

describe('Text (styled, SSR)', () => {
  it('renders a p with the recipe class by default', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    const el = document.querySelector('[data-testid="text"]')
    expect(el?.tagName).toBe('P')
    expect(el?.getAttribute('class')).toContain('text')
  })

  it('renders as another element and applies style props', async () => {
    const { document } = await ssrRenderToDom(<TextAs />, { qwikLoader: true })
    const el = document.querySelector('[data-testid="text-span"]')
    expect(el?.tagName).toBe('SPAN')
    expect(el?.getAttribute('class')).toContain('trunc_true')
  })
})
