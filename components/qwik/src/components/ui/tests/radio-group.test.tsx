import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './radio-group.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('RadioGroup (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-part="root"]')).toContain('radio-group__root')
    expect(getClasses(document, '[data-part="label"]')).toContain('radio-group__label')
    expect(getClasses(document, '[data-part="indicator"]')).toContain('radio-group__indicator')
    expect(getClasses(document, '[data-part="item"]')).toContain('radio-group__item')
    expect(getClasses(document, '[data-part="item-control"]')).toContain('radio-group__itemControl')
    expect(getClasses(document, '[data-part="item-text"]')).toContain('radio-group__itemText')
  })

  it('applies default and changed variant classes', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    expect(getClasses(document, '[data-part="root"]')).toContain('radio-group__root--size_md')
    expect(getClasses(document, '[data-part="item"]')).toContain('radio-group__item--variant_solid')

    const sized = await ssrRenderToDom(<ComponentUnderTest size="lg" />, { qwikLoader: true })
    expect(getClasses(sized.document, '[data-part="item"]')).toContain('radio-group__item--size_lg')
  })

  it('marks the default value as checked', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(document.querySelector('[data-testid="item-react"]')?.getAttribute('data-state')).toBe(
      'checked',
    )
    expect(document.querySelector('[data-testid="item-vue"]')?.getAttribute('data-state')).toBe(
      'unchecked',
    )
  })
})
