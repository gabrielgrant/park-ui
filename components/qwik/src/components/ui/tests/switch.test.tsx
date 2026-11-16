import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest, WithIndicators } from './switch.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Switch (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-part="root"]')).toContain('switch__root')
    expect(getClasses(document, '[data-part="control"]')).toContain('switch__control')
    expect(getClasses(document, '[data-part="thumb"]')).toContain('switch__thumb')
    expect(getClasses(document, '[data-part="label"]')).toContain('switch__label')
  })

  it('renders a default Thumb inside an empty Control', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(document.querySelectorAll('[data-part="control"] [data-part="thumb"]').length).toBe(1)
  })

  it('applies default and changed variant classes', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    expect(getClasses(document, '[data-part="root"]')).toContain('switch__root--size_md')
    expect(getClasses(document, '[data-part="control"]')).toContain(
      'switch__control--variant_solid',
    )

    const sized = await ssrRenderToDom(<ComponentUnderTest size="lg" />, { qwikLoader: true })
    expect(getClasses(sized.document, '[data-part="root"]')).toContain('switch__root--size_lg')
  })

  it('reflects a controlled checked prop', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest checked />, { qwikLoader: true })

    expect(document.querySelector('[data-part="control"]')?.getAttribute('data-state')).toBe(
      'checked',
    )
    expect(document.querySelector('input')?.hasAttribute('checked')).toBe(true)
  })

  it('shows the fallback of indicators while unchecked', async () => {
    const { document } = await ssrRenderToDom(<WithIndicators />, { qwikLoader: true })

    const indicator = document.querySelector('[data-testid="indicator"]')
    expect(indicator?.getAttribute('class')).toContain('switch__indicator')
    expect(indicator?.hasAttribute('data-checked')).toBe(false)
    expect(indicator?.querySelector('[data-testid="x-icon"]')?.closest('[hidden]')).toBeFalsy()
    expect(indicator?.querySelector('[data-testid="check-icon"]')?.closest('[hidden]')).toBeTruthy()
    const thumbIndicator = document.querySelector('[data-testid="thumb-indicator"]')
    expect(thumbIndicator?.textContent).toContain('off')
    expect(
      Array.from(thumbIndicator?.querySelectorAll('span') ?? [])
        .find((el) => el.textContent === 'on')
        ?.closest('[hidden]'),
    ).toBeTruthy()
  })

  it('shows the children of indicators while checked', async () => {
    const { document } = await ssrRenderToDom(<WithIndicators checked />, { qwikLoader: true })

    const indicator = document.querySelector('[data-testid="indicator"]')
    expect(indicator?.hasAttribute('data-checked')).toBe(true)
    expect(indicator?.querySelector('[data-testid="x-icon"]')?.closest('[hidden]')).toBeTruthy()
    expect(indicator?.querySelector('[data-testid="check-icon"]')?.closest('[hidden]')).toBeFalsy()
    const thumbIndicator = document.querySelector('[data-testid="thumb-indicator"]')
    expect(thumbIndicator?.hasAttribute('data-checked')).toBe(true)
    expect(
      Array.from(thumbIndicator?.querySelectorAll('span') ?? [])
        .find((el) => el.textContent === 'off')
        ?.closest('[hidden]'),
    ).toBeTruthy()
  })
})
