import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './number-input.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('NumberInput (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-part="root"]')).toContain('number-input__root')
    expect(getClasses(document, '[data-part="label"]')).toContain('number-input__label')
    expect(getClasses(document, '[data-part="control"]')).toContain('number-input__control')
    expect(getClasses(document, '[data-part="input"]')).toContain('number-input__input')
    expect(getClasses(document, '[data-part="increment-trigger"]')).toContain(
      'number-input__incrementTrigger',
    )
    expect(getClasses(document, '[data-part="decrement-trigger"]')).toContain(
      'number-input__decrementTrigger',
    )
  })

  it('applies default and changed variant classes', async () => {
    const defaults = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    expect(getClasses(defaults.document, '[data-part="input"]')).toContain(
      'number-input__input--size_md',
    )
    expect(getClasses(defaults.document, '[data-part="input"]')).toContain(
      'number-input__input--variant_outline',
    )

    const custom = await ssrRenderToDom(<ComponentUnderTest size="xl" variant="surface" />, {
      qwikLoader: true,
    })
    expect(getClasses(custom.document, '[data-part="input"]')).toContain(
      'number-input__input--size_xl',
    )
    expect(getClasses(custom.document, '[data-part="input"]')).toContain(
      'number-input__input--variant_surface',
    )
  })

  it('renders default increment/decrement triggers with chevron icons inside Control', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const control = document.querySelector('[data-part="control"]')
    const inc = control?.querySelector('[data-part="increment-trigger"]')
    const dec = control?.querySelector('[data-part="decrement-trigger"]')
    expect(inc?.querySelector('svg path')?.getAttribute('d')).toBe('m18 15-6-6-6 6')
    expect(dec?.querySelector('svg path')?.getAttribute('d')).toBe('m6 9 6 6 6-6')
  })

  it('reflects defaultValue in the input', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(document.querySelector('[data-part="input"]')?.getAttribute('value')).toBe('42')
  })
})
