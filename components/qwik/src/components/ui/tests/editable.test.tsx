import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './editable.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Editable (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    for (const [part, slot] of [
      ['root', 'root'],
      ['label', 'label'],
      ['area', 'area'],
      ['preview', 'preview'],
      ['input', 'input'],
      ['control', 'control'],
      ['edit-trigger', 'editTrigger'],
      ['cancel-trigger', 'cancelTrigger'],
      ['submit-trigger', 'submitTrigger'],
    ]) {
      expect(getClasses(document, `[data-part="${part}"]`)).toContain(`editable__${slot}`)
    }
  })

  it('applies default and changed size classes', async () => {
    const defaults = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    expect(getClasses(defaults.document, '[data-part="preview"]')).toContain(
      'editable__preview--size_md',
    )

    const custom = await ssrRenderToDom(<ComponentUnderTest size="lg" />, { qwikLoader: true })
    expect(getClasses(custom.document, '[data-part="preview"]')).toContain(
      'editable__preview--size_lg',
    )
  })

  it('renders the preview state by default', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(document.querySelector('[data-part="preview"]')?.textContent).toBe('Click to edit')
    expect(document.querySelector('[data-part="input"]')?.hasAttribute('hidden')).toBe(true)
    expect(document.querySelector('[data-part="submit-trigger"]')?.hasAttribute('hidden')).toBe(
      true,
    )
  })
})
