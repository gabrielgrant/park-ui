import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './file-upload.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('FileUpload (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const slots: Array<[string, string]> = [
      ['root', 'root'],
      ['label', 'label'],
      ['dropzone', 'dropzone'],
      ['trigger', 'trigger'],
      ['clear-trigger', 'clearTrigger'],
      ['item-group', 'itemGroup'],
    ]
    for (const [part, slot] of slots) {
      expect(getClasses(document, `[data-scope="file-upload"][data-part="${part}"]`), part).toContain(
        `file-upload__${slot}`,
      )
    }
  })

  it('applies the default size variant', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-scope="file-upload"][data-part="root"]')).toContain('file-upload__root--size_md')
  })

  it('renders the file text fallback as a placeholder', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const fileText = document.querySelector('[data-testid="file-text"]')
    expect(fileText?.tagName).toBe('SPAN')
    expect(fileText?.textContent).toBe('Select file(s)')
    expect(fileText?.hasAttribute('data-placeholder')).toBe(true)
  })

  it('renders an empty item list without files', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(document.querySelectorAll('[data-part="item"]').length).toBe(0)
  })
})
