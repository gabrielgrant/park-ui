import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './toggle-group.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('ToggleGroup (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-part="root"]')).toContain('toggle-group__root')
    expect(getClasses(document, '[data-part="item"]')).toContain('toggle-group__item')
  })

  it('applies the outline variant class', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest variant="outline" />, {
      qwikLoader: true,
    })

    expect(getClasses(document, '[data-part="root"]')).toContain(
      'toggle-group__root--variant_outline',
    )
  })

  it('marks default values as on', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const items = document.querySelectorAll('[data-part="item"]')
    expect(items[0]?.getAttribute('data-state')).toBe('on')
    expect(items[1]?.getAttribute('data-state')).toBe('off')
  })
})
