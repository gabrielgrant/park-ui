import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './radio-card-group.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('RadioCardGroup (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-part="root"]')).toContain('radio-card-group__root')
    expect(getClasses(document, '[data-part="label"]')).toContain('radio-card-group__label')
    expect(getClasses(document, '[data-part="item"]')).toContain('radio-card-group__item')
    expect(getClasses(document, '[data-part="item-control"]')).toContain(
      'radio-card-group__itemControl',
    )
    expect(getClasses(document, '[data-part="item-text"]')).toContain('radio-card-group__itemText')
  })

  it('applies default and changed variant classes', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    expect(getClasses(document, '[data-part="item"]')).toContain(
      'radio-card-group__item--variant_outline',
    )

    const solid = await ssrRenderToDom(<ComponentUnderTest variant="solid" />, { qwikLoader: true })
    const classes = getClasses(solid.document, '[data-part="item"]')
    expect(classes).toContain('radio-card-group__item--variant_solid')
    expect(classes).not.toContain('radio-card-group__item--variant_outline')
  })

  it('uses the radio-group machine for the checked state', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(document.querySelector('[data-testid="item-react"]')?.getAttribute('data-state')).toBe(
      'checked',
    )
    expect(document.querySelector('[data-part="root"]')?.getAttribute('role')).toBe('radiogroup')
  })
})
