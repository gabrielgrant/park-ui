import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './clipboard.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Clipboard (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-scope="clipboard"][data-part="root"]')).toContain(
      'clipboard__root',
    )
    expect(getClasses(document, '[data-testid="label"]')).toContain('clipboard__label')
    expect(getClasses(document, '[data-testid="control"]')).toContain('clipboard__control')
    expect(getClasses(document, '[data-testid="input"]')).toContain('clipboard__input')
    expect(getClasses(document, '[data-testid="trigger"]')).toContain('clipboard__trigger')
    expect(getClasses(document, '[data-testid="indicator"]')).toContain('clipboard__indicator')
    expect(getClasses(document, '[data-testid="copy-text"]')).toContain('clipboard__indicator')
  })

  it('renders the copy icon and text before copying', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(document.querySelector('[data-testid="indicator"] svg')).toBeTruthy()
    expect(document.querySelector('[data-testid="copy-text"]')?.textContent).toBe('Copy')
    expect(document.querySelector('[data-testid="input"]')?.getAttribute('value')).toBe(
      'https://park-ui.com',
    )
  })
})
