import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './card.fixtures'

describe('Card (styled, SSR)', () => {
  it('applies slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    const cls = (id: string) =>
      document.querySelector(`[data-testid="${id}"]`)?.getAttribute('class') ?? ''
    for (const slot of ['root', 'header', 'title', 'description', 'body', 'footer']) {
      expect(cls(slot)).toContain(`card__${slot}`)
    }
  })

  it('applies the variant to the root and children', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    expect(document.querySelector('[data-testid="root"]')?.getAttribute('class')).toContain(
      'card__root--variant_elevated',
    )
    expect(document.querySelector('[data-testid="title"]')?.tagName).toBe('H3')
    expect(document.querySelector('[data-testid="body"]')?.textContent).toBe('Body')
  })
})
