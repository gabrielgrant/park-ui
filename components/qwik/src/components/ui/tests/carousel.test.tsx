import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './carousel.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Carousel (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const slots: Array<[string, string]> = [
      ['root', 'root'],
      ['item-group', 'itemGroup'],
      ['item', 'item'],
      ['control', 'control'],
      ['prev-trigger', 'prevTrigger'],
      ['next-trigger', 'nextTrigger'],
      ['indicator-group', 'indicatorGroup'],
      ['indicator', 'indicator'],
    ]
    for (const [part, slot] of slots) {
      expect(getClasses(document, `[data-scope="carousel"][data-part="${part}"]`), part).toContain(
        `carousel__${slot}`,
      )
    }
  })

  it('applies default and inline variant classes', async () => {
    const plain = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    expect(getClasses(plain.document, '[data-part="root"]')).toContain('carousel__root--size_md')
    expect(getClasses(plain.document, '[data-part="control"]')).not.toContain(
      'carousel__control--inline_true',
    )

    const inline = await ssrRenderToDom(<ComponentUnderTest inline />, { qwikLoader: true })
    expect(getClasses(inline.document, '[data-part="control"]')).toContain(
      'carousel__control--inline_true',
    )
  })

  it('renders one indicator per page and marks the first current', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const indicators = document.querySelectorAll('[data-part="indicator"]')
    expect(indicators.length).toBe(5)
    expect(indicators[0]?.hasAttribute('data-current')).toBe(true)
  })

  it('applies the default spacing', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(document.querySelector('[data-part="root"]')?.getAttribute('style')).toContain('16px')
  })

  it('forwards the controlled page prop to the machine instead of styling it', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest page={2} />, { qwikLoader: true })

    const indicators = document.querySelectorAll('[data-part="indicator"]')
    expect(indicators[2]?.hasAttribute('data-current')).toBe(true)
    expect(document.querySelector('[data-part="root"]')?.getAttribute('class')).not.toMatch(/page_/)
  })
})
