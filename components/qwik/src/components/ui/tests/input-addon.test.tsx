import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './input-addon.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('InputAddon (styled, SSR)', () => {
  it('applies the input-addon recipe with default variants', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const classes = getClasses(document, '[data-testid="addon"]')
    expect(document.querySelector('[data-testid="addon"]')?.tagName).toBe('DIV')
    expect(classes).toContain('input-addon')
    expect(classes).toContain('input-addon--size_md')
    expect(classes).toContain('input-addon--variant_outline')
  })

  it('changes classes with variant props', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest size="xl" variant="subtle" />, {
      qwikLoader: true,
    })

    const classes = getClasses(document, '[data-testid="addon"]')
    expect(classes).toContain('input-addon--size_xl')
    expect(classes).toContain('input-addon--variant_subtle')
  })
})
