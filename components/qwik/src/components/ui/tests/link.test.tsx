import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './link.fixtures'

describe('Link (styled, SSR)', () => {
  it('renders an anchor with href and variant class', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    const el = document.querySelector('[data-testid="link"]')
    expect(el?.tagName).toBe('A')
    expect(el?.getAttribute('href')).toBe('https://park-ui.com')
    expect(el?.getAttribute('class')).toContain('link--variant_plain')
  })
})
