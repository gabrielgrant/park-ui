import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './hover-card.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('HoverCard (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest defaultOpen />, {
      qwikLoader: true,
    })

    expect(getClasses(document, '[data-testid="trigger"]')).toContain('hover-card__trigger')
    expect(getClasses(document, '[data-testid="positioner"]')).toContain('hover-card__positioner')
    expect(getClasses(document, '[data-testid="content"]')).toContain('hover-card__content')
    expect(getClasses(document, '[data-testid="arrow"]')).toContain('hover-card__arrow')
    expect(getClasses(document, '[data-testid="arrow-tip"]')).toContain('hover-card__arrowTip')
  })

  it('reflects open state through SSR', async () => {
    const closed = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    expect(
      closed.document.querySelector('[data-testid="content"]')?.getAttribute('data-state'),
    ).toBe('closed')

    const open = await ssrRenderToDom(<ComponentUnderTest defaultOpen />, { qwikLoader: true })
    expect(open.document.querySelector('[data-testid="content"]')?.getAttribute('data-state')).toBe(
      'open',
    )
  })
})
