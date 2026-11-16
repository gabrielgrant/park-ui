import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest, InputInField } from './input.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Input (styled, SSR)', () => {
  it('applies the input recipe with default variants', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const classes = getClasses(document, '[data-testid="input"]')
    expect(document.querySelector('[data-testid="input"]')?.tagName).toBe('INPUT')
    expect(classes).toContain('input')
    expect(classes).toContain('input--size_md')
    expect(classes).toContain('input--variant_outline')
  })

  it('changes classes with variant props', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest size="lg" variant="flushed" />, {
      qwikLoader: true,
    })

    const classes = getClasses(document, '[data-testid="input"]')
    expect(classes).toContain('input--size_lg')
    expect(classes).toContain('input--variant_flushed')
    expect(classes).not.toContain('input--variant_outline')
  })

  it('wires field state onto the input', async () => {
    const { document } = await ssrRenderToDom(<InputInField />, { qwikLoader: true })

    const input = document.querySelector('[data-testid="input"]')
    const label = document.querySelector('[data-part="label"]')
    expect(input?.getAttribute('aria-invalid')).toBe('true')
    expect(input?.hasAttribute('required')).toBe(true)
    expect(label?.getAttribute('for')).toBe(input?.id)
  })
})
