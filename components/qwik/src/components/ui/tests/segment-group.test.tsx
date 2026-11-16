import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './segment-group.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('SegmentGroup (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-part="root"]')).toContain('segment-group__root')
    expect(getClasses(document, '[data-part="indicator"]')).toContain('segment-group__indicator')
    expect(getClasses(document, '[data-part="item"]')).toContain('segment-group__item')
    expect(getClasses(document, '[data-part="item-text"]')).toContain('segment-group__itemText')
  })

  it('renders one item per entry from Items, normalizing strings', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const items = document.querySelectorAll('[data-part="item"]')
    expect(items.length).toBe(4)
    expect([...items].map((item) => item.textContent)).toEqual(['React', 'Solid', 'Svelte', 'Vue'])
    expect(items[0]?.getAttribute('data-state')).toBe('checked')
    expect(items[2]?.hasAttribute('data-disabled')).toBe(true)
    expect(document.querySelectorAll('[data-part="item"] input').length).toBe(4)
  })

  it('defaults to horizontal orientation and forwards orientation to the machine', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    expect(document.querySelector('[data-part="root"]')?.getAttribute('data-orientation')).toBe(
      'horizontal',
    )

    const vertical = await ssrRenderToDom(<ComponentUnderTest orientation="vertical" />, {
      qwikLoader: true,
    })
    expect(
      vertical.document.querySelector('[data-part="root"]')?.getAttribute('data-orientation'),
    ).toBe('vertical')
  })

  it('applies size and fitted variants', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest size="lg" fitted />, {
      qwikLoader: true,
    })

    const classes = getClasses(document, '[data-part="root"]')
    expect(classes).toContain('segment-group__root--size_lg')
    expect(classes).toContain('segment-group__root--fitted_true')
  })
})
