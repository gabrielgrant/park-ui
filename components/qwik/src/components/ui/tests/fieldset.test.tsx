import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './fieldset.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Fieldset (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest invalid />, { qwikLoader: true })

    expect(document.querySelector('fieldset')?.getAttribute('class')).toContain('fieldset__root')
    expect(getClasses(document, '.fieldset__control')).toContain('fieldset__control')
    expect(getClasses(document, '.fieldset__content')).toContain('fieldset__content')
    expect(getClasses(document, '[data-scope="fieldset"][data-part="legend"]')).toContain(
      'fieldset__legend',
    )
    expect(getClasses(document, '[data-scope="fieldset"][data-part="helper-text"]')).toContain(
      'fieldset__helperText',
    )
    expect(getClasses(document, '[data-scope="fieldset"][data-part="error-text"]')).toContain(
      'fieldset__errorText',
    )
  })

  it('labels the fieldset by its legend', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const legend = document.querySelector('legend')
    expect(document.querySelector('fieldset')?.getAttribute('aria-labelledby')).toBe(legend?.id)
  })

  it('cascades invalid state to nested fields', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest invalid />, { qwikLoader: true })

    expect(document.querySelector('fieldset')?.hasAttribute('data-invalid')).toBe(true)
    expect(
      document
        .querySelector('[data-scope="field"][data-part="input"]')
        ?.getAttribute('aria-invalid'),
    ).toBe('true')
  })

  it('hides the error text when valid', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(document.querySelector('[data-scope="fieldset"][data-part="error-text"]')).toBeFalsy()
  })
})
