import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './display-value.fixtures'

describe('DisplayValue (SSR)', () => {
  it('renders the value, formatted when a formatter is given', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    const text = (id: string) => document.querySelector(`[data-testid="${id}"]`)?.textContent
    expect(text('string')).toBe('Park UI')
    expect(text('formatted')).toBe('React, Solid')
    expect(text('number')).toBe('0')
  })

  it('renders a placeholder with a visually hidden label for empty values', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    for (const id of ['null', 'empty-string', 'empty-array']) {
      const el = document.querySelector(`[data-testid="${id}"]`)
      const dash = el?.querySelector('[aria-hidden]')
      expect(dash?.textContent).toBe('—')
      expect(dash?.getAttribute('class')).toContain('c_fg.subtle')
      expect(el?.textContent).toContain('No value available')
    }
  })
})
