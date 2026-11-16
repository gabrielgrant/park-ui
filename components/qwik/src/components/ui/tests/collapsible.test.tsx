import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './collapsible.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Collapsible (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-part="root"]')).toContain('collapsible__root')
    expect(getClasses(document, '[data-testid="trigger"]')).toContain('collapsible__trigger')
    expect(getClasses(document, '[data-testid="indicator"]')).toContain('collapsible__indicator')
    expect(getClasses(document, '[data-testid="content"]')).toContain('collapsible__content')
  })

  it('merges a user class after the slot classes', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest class="custom-root" />, {
      qwikLoader: true,
    })

    const classes = getClasses(document, '[data-part="root"]')
    expect(classes).toContain('collapsible__root')
    expect(classes).toContain('custom-root')
  })

  it('reflects defaultOpen through SSR', async () => {
    const closed = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    expect(
      closed.document.querySelector('[data-testid="trigger"]')?.getAttribute('aria-expanded'),
    ).toBe('false')

    const open = await ssrRenderToDom(<ComponentUnderTest defaultOpen />, { qwikLoader: true })
    expect(
      open.document.querySelector('[data-testid="trigger"]')?.getAttribute('aria-expanded'),
    ).toBe('true')
    expect(open.document.querySelector('[data-testid="content"]')?.hasAttribute('hidden')).toBe(
      false,
    )
  })
})
