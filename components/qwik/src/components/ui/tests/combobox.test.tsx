import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './combobox.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Combobox (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-scope="combobox"][data-part="root"]')).toContain(
      'combobox__root',
    )
    expect(getClasses(document, '[data-testid="label"]')).toContain('combobox__label')
    expect(getClasses(document, '[data-testid="control"]')).toContain('combobox__control')
    expect(getClasses(document, '[data-testid="input"]')).toContain('combobox__input')
    expect(getClasses(document, '[data-testid="indicator-group"]')).toContain(
      'combobox__indicatorGroup',
    )
    expect(getClasses(document, '[data-testid="clear-trigger"]')).toContain(
      'combobox__clearTrigger',
    )
    expect(getClasses(document, '[data-testid="trigger"]')).toContain('combobox__trigger')
    expect(getClasses(document, '[data-testid="positioner"]')).toContain('combobox__positioner')
    expect(getClasses(document, '[data-testid="content"]')).toContain('combobox__content')
    expect(getClasses(document, '[data-testid="empty"]')).toContain('combobox__empty')
    expect(getClasses(document, '[data-testid="item-group"]')).toContain('combobox__itemGroup')
    expect(getClasses(document, '[data-testid="item-group-label"]')).toContain(
      'combobox__itemGroupLabel',
    )
    expect(getClasses(document, '[data-testid="item-react"]')).toContain('combobox__item')
    expect(getClasses(document, '[data-testid="item-text-react"]')).toContain('combobox__itemText')
  })

  it('applies default and explicit variant classes', async () => {
    const defaults = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    expect(getClasses(defaults.document, '[data-testid="input"]')).toContain(
      'combobox__input--size_md',
    )
    expect(getClasses(defaults.document, '[data-testid="input"]')).toContain(
      'combobox__input--variant_outline',
    )

    const custom = await ssrRenderToDom(<ComponentUnderTest size="lg" variant="surface" />, {
      qwikLoader: true,
    })
    expect(getClasses(custom.document, '[data-testid="input"]')).toContain(
      'combobox__input--size_lg',
    )
    expect(getClasses(custom.document, '[data-testid="input"]')).toContain(
      'combobox__input--variant_surface',
    )
  })

  it('renders the default trigger and clear icons', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(document.querySelector('[data-testid="trigger"] svg')).toBeTruthy()
    expect(document.querySelector('[data-testid="clear-trigger"] svg')).toBeTruthy()
  })

  it('hides the empty state while the collection has items', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const empty = document.querySelector('[data-testid="empty"]')
    expect(empty?.getAttribute('data-part')).toBe('empty')
    expect(empty?.hasAttribute('hidden')).toBe(true)
  })

  it('renders the check icon only for the selected item', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest defaultValue={['vue']} />, {
      qwikLoader: true,
    })

    const selected = document.querySelector('[data-testid="indicator-vue"]')
    expect(selected?.getAttribute('class')).toContain('combobox__itemIndicator')
    expect(selected?.querySelector('svg')).toBeTruthy()
    expect(document.querySelector('[data-testid="indicator-react"]')).toBeFalsy()
  })
})
