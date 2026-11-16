import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest, HeadingAs } from './heading.fixtures'

describe('Heading (styled, SSR)', () => {
  it('renders an h2 with the recipe class by default', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    const el = document.querySelector('[data-testid="heading"]')
    expect(el?.tagName).toBe('H2')
    expect(el?.getAttribute('class')).toContain('heading')
  })

  it('renders as another element via `as`', async () => {
    const { document } = await ssrRenderToDom(<HeadingAs />, { qwikLoader: true })
    const el = document.querySelector('[data-testid="heading-h1"]')
    expect(el?.tagName).toBe('H1')
    expect(el?.getAttribute('class')).toContain('heading')
    expect(el?.getAttribute('class')).toContain('textStyle_xl')
  })
})
