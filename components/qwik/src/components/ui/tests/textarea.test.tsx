import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest, TextareaInField } from './textarea.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Textarea (styled, SSR)', () => {
  it('applies the textarea recipe with default variants', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const classes = getClasses(document, '[data-testid="textarea"]')
    expect(document.querySelector('[data-testid="textarea"]')?.tagName).toBe('TEXTAREA')
    expect(classes).toContain('textarea')
    expect(classes).toContain('textarea--size_md')
    expect(classes).toContain('textarea--variant_surface')
  })

  it('changes classes with variant props', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest size="xl" variant="subtle" />, {
      qwikLoader: true,
    })

    const classes = getClasses(document, '[data-testid="textarea"]')
    expect(classes).toContain('textarea--size_xl')
    expect(classes).toContain('textarea--variant_subtle')
  })

  it('wires field state onto the textarea', async () => {
    const { document } = await ssrRenderToDom(<TextareaInField />, { qwikLoader: true })

    const textarea = document.querySelector('[data-testid="textarea"]')
    expect(textarea?.getAttribute('aria-invalid')).toBe('true')
    expect(document.querySelector('[data-part="label"]')?.getAttribute('for')).toBe(textarea?.id)
  })
})
