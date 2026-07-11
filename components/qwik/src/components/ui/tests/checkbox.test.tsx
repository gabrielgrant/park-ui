import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './basic'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Checkbox (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-part="root"]')).toContain('checkbox__root')
    expect(getClasses(document, '[data-part="control"]')).toContain('checkbox__control')
    expect(getClasses(document, '[data-part="label"]')).toContain('checkbox__label')
  })

  it('applies default variant classes', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-part="root"]')).toContain('checkbox__root--size_md')
    expect(getClasses(document, '[data-part="control"]')).toContain('checkbox__control--variant_solid')
  })

  it('changes slot classes with variant props', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest size="lg" variant="outline" />, {
      qwikLoader: true,
    })

    expect(getClasses(document, '[data-part="root"]')).toContain('checkbox__root--size_lg')
    expect(getClasses(document, '[data-part="control"]')).toContain('checkbox__control--variant_outline')
    expect(getClasses(document, '[data-part="control"]')).not.toContain('checkbox__control--variant_solid')
  })

  it('merges a user class after the slot classes', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest class="custom-root" />, {
      qwikLoader: true,
    })

    const classes = getClasses(document, '[data-part="root"]')
    expect(classes).toContain('checkbox__root')
    expect(classes).toContain('custom-root')
  })

  it('unstyled drops the recipe classes', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest unstyled class="bare" />, {
      qwikLoader: true,
    })

    const classes = getClasses(document, '[data-part="root"]')
    expect(classes).not.toContain('checkbox__root')
    expect(classes).toContain('bare')
  })

  it('renders the checkmark and indeterminate indicators with correct visibility', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest checked />, { qwikLoader: true })

    const indicators = document.querySelectorAll('[data-part="indicator"]')
    expect(indicators.length).toBe(2)
    expect(indicators[0]?.hasAttribute('hidden')).toBe(false)
    expect(indicators[1]?.hasAttribute('hidden')).toBe(true)
    expect(document.querySelector('[data-part="indicator"] svg title')?.textContent).toBe('Checkmark')
  })

  it('reflects a controlled checked prop through SSR', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest checked />, { qwikLoader: true })

    expect(document.querySelector('[data-part="control"]')?.getAttribute('data-state')).toBe('checked')
  })
})
