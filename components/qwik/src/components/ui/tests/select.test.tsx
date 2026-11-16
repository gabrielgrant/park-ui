import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './select.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Select (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-scope="select"][data-part="root"]')).toContain(
      'select__root',
    )
    expect(getClasses(document, '[data-testid="label"]')).toContain('select__label')
    expect(getClasses(document, '[data-testid="control"]')).toContain('select__control')
    expect(getClasses(document, '[data-testid="trigger"]')).toContain('select__trigger')
    expect(getClasses(document, '[data-testid="value-text"]')).toContain('select__valueText')
    expect(getClasses(document, '[data-testid="indicator-group"]')).toContain(
      'select__indicatorGroup',
    )
    expect(getClasses(document, '[data-testid="indicator"]')).toContain('select__indicator')
    expect(getClasses(document, '[data-testid="positioner"]')).toContain('select__positioner')
    expect(getClasses(document, '[data-testid="content"]')).toContain('select__content')
    expect(getClasses(document, '[data-testid="item-group"]')).toContain('select__itemGroup')
    expect(getClasses(document, '[data-testid="item-group-label"]')).toContain(
      'select__itemGroupLabel',
    )
    expect(getClasses(document, '[data-testid="item-react"]')).toContain('select__item')
    expect(getClasses(document, '[data-testid="item-text-react"]')).toContain('select__itemText')
  })

  it('applies default and explicit variant classes', async () => {
    const defaults = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    expect(getClasses(defaults.document, '[data-testid="trigger"]')).toContain(
      'select__trigger--size_md',
    )
    expect(getClasses(defaults.document, '[data-testid="trigger"]')).toContain(
      'select__trigger--variant_outline',
    )

    const custom = await ssrRenderToDom(<ComponentUnderTest size="lg" variant="surface" />, {
      qwikLoader: true,
    })
    expect(getClasses(custom.document, '[data-testid="trigger"]')).toContain(
      'select__trigger--size_lg',
    )
    expect(getClasses(custom.document, '[data-testid="trigger"]')).toContain(
      'select__trigger--variant_surface',
    )
  })

  it('renders the default indicator icon and placeholder', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(document.querySelector('[data-testid="indicator"] svg')).toBeTruthy()
    expect(document.querySelector('[data-testid="value-text"]')?.textContent).toBe(
      'Select a framework',
    )
  })

  it('renders the check icon only for the selected item', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest defaultValue={['vue']} />, {
      qwikLoader: true,
    })

    expect(document.querySelector('[data-testid="value-text"]')?.textContent).toBe('Vue')
    const selected = document.querySelector('[data-testid="indicator-vue"]')
    expect(selected?.getAttribute('class')).toContain('select__itemIndicator')
    expect(selected?.querySelector('svg')).toBeTruthy()
    expect(document.querySelector('[data-testid="indicator-react"]')).toBeFalsy()
  })
})
