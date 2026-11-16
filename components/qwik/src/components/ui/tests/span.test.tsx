import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './span.fixtures'

describe('Span (styled, SSR)', () => {
  it('renders a span with style-prop classes', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    const el = document.querySelector('[data-testid="span"]')
    expect(el?.tagName).toBe('SPAN')
    expect(el?.getAttribute('class')).toContain('c_fg.subtle')
  })
})
