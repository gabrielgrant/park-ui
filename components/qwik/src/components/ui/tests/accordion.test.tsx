import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './accordion.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Accordion (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-part="root"]')).toContain('accordion__root')
    expect(getClasses(document, '[data-part="item"]')).toContain('accordion__item')
    expect(getClasses(document, '[data-part="item-trigger"]')).toContain('accordion__itemTrigger')
    expect(getClasses(document, '[data-part="item-indicator"]')).toContain(
      'accordion__itemIndicator',
    )
    expect(getClasses(document, '[data-part="item-content"]')).toContain('accordion__itemContent')
    expect(getClasses(document, '[data-part="item-content"] > div')).toContain(
      'accordion__itemBody',
    )
  })

  it('applies default variant classes', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-part="root"]')).toContain('accordion__root--variant_outline')
    expect(getClasses(document, '[data-part="item"]')).toContain('accordion__item--size_md')
  })

  it('changes slot classes with variant props', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest variant="plain" />, {
      qwikLoader: true,
    })

    expect(getClasses(document, '[data-part="item-trigger"]')).toContain(
      'accordion__itemTrigger--variant_plain',
    )
    expect(getClasses(document, '[data-part="item-trigger"]')).not.toContain(
      'accordion__itemTrigger--variant_outline',
    )
  })

  it('renders the default chevron icon inside the item indicator', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const indicators = document.querySelectorAll('[data-part="item-indicator"]')
    expect(indicators.length).toBe(3)
    expect(indicators[0]?.querySelector('svg path')?.getAttribute('d')).toBe('m6 9 6 6 6-6')
  })

  it('reflects defaultValue through SSR', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest defaultValue={['Solid']} />, {
      qwikLoader: true,
    })

    expect(
      document.querySelector('[data-testid="trigger-Solid"]')?.getAttribute('aria-expanded'),
    ).toBe('true')
    expect(document.querySelector('[data-testid="content-Solid"]')?.hasAttribute('hidden')).toBe(
      false,
    )
    expect(document.querySelector('[data-testid="content-React"]')?.hasAttribute('hidden')).toBe(
      true,
    )
  })
})
