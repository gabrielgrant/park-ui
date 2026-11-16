import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './pin-input.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('PinInput (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-part="root"]')).toContain('pin-input__root')
    expect(getClasses(document, '[data-part="label"]')).toContain('pin-input__label')
    expect(getClasses(document, '[data-part="control"]')).toContain('pin-input__control')
    expect(document.querySelectorAll('.pin-input__input[data-part="input"]').length).toBe(4)
  })

  it('applies default and changed variant classes', async () => {
    const defaults = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    expect(getClasses(defaults.document, '[data-part="input"]')).toContain(
      'pin-input__input--size_md',
    )
    expect(getClasses(defaults.document, '[data-part="input"]')).toContain(
      'pin-input__input--variant_outline',
    )

    const custom = await ssrRenderToDom(<ComponentUnderTest size="xl" variant="flushed" />, {
      qwikLoader: true,
    })
    expect(getClasses(custom.document, '[data-part="input"]')).toContain(
      'pin-input__input--size_xl',
    )
    expect(getClasses(custom.document, '[data-part="input"]')).toContain(
      'pin-input__input--variant_flushed',
    )
  })

  it('forwards mask to the machine instead of treating it as a style prop', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest mask />, { qwikLoader: true })

    expect(document.querySelector('[data-part="input"]')?.getAttribute('type')).toBe('password')
    expect(getClasses(document, '[data-part="root"]').some((c) => c.startsWith('msk_'))).toBe(false)
  })

  it('reflects defaultValue in the inputs', async () => {
    const { document } = await ssrRenderToDom(
      <ComponentUnderTest defaultValue={['1', '2', '3', '4']} />,
      {
        qwikLoader: true,
      },
    )

    const values = [...document.querySelectorAll('[data-part="input"]')].map((el) =>
      el.getAttribute('value'),
    )
    expect(values).toEqual(['1', '2', '3', '4'])
  })
})
