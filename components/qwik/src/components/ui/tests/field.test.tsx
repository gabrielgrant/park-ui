import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './field.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Field (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest required invalid />, {
      qwikLoader: true,
    })

    expect(getClasses(document, '[data-part="root"]')).toContain('field__root')
    expect(getClasses(document, '[data-part="label"]')).toContain('field__label')
    expect(getClasses(document, '[data-part="required-indicator"]')).toContain(
      'field__requiredIndicator',
    )
    expect(getClasses(document, '[data-part="helper-text"]')).toContain('field__helperText')
    expect(getClasses(document, '[data-part="error-text"]')).toContain('field__errorText')
    expect(getClasses(document, '[data-part="input"]')).toContain('input')
  })

  it('renders the default required indicator', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest required />, { qwikLoader: true })

    expect(document.querySelector('[data-part="required-indicator"]')?.textContent).toBe('*')
  })

  it('hides the required indicator and error text when not applicable', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(document.querySelector('[data-part="required-indicator"]')).toBeFalsy()
    expect(document.querySelector('[data-part="error-text"]')).toBeFalsy()
  })

  it('propagates disabled state to the input', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest disabled />, { qwikLoader: true })

    expect(document.querySelector('[data-part="input"]')?.hasAttribute('disabled')).toBe(true)
    expect(document.querySelector('[data-part="root"]')?.hasAttribute('data-disabled')).toBe(true)
  })
})
