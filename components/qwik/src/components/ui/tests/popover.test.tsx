import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './popover.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Popover (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest defaultOpen />, {
      qwikLoader: true,
    })

    expect(getClasses(document, '[data-testid="trigger"]')).toContain('popover__trigger')
    expect(getClasses(document, '[data-testid="positioner"]')).toContain('popover__positioner')
    expect(getClasses(document, '[data-testid="content"]')).toContain('popover__content')
    expect(getClasses(document, '[data-testid="arrow"]')).toContain('popover__arrow')
    expect(getClasses(document, '[data-part="title"]')).toContain('popover__title')
    expect(getClasses(document, '[data-part="description"]')).toContain('popover__description')
    expect(getClasses(document, '[data-testid="header"]')).toContain('popover__header')
    expect(getClasses(document, '[data-testid="body"]')).toContain('popover__body')
    expect(getClasses(document, '[data-testid="footer"]')).toContain('popover__footer')
    expect(getClasses(document, '[data-testid="close"]')).toContain('popover__closeTrigger')
  })

  it('renders the default ArrowTip inside Arrow', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest defaultOpen />, {
      qwikLoader: true,
    })

    const tip = document.querySelector('[data-testid="arrow"] > [data-part="arrow-tip"]')
    expect(tip?.getAttribute('class')?.split(/\s+/)).toContain('popover__arrowTip')
  })

  it('lazy-mounts content by default', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(document.querySelector('[data-testid="trigger"]')?.getAttribute('aria-expanded')).toBe(
      'false',
    )
    expect(document.querySelector('[data-testid="content"]')).toBeFalsy()
  })
})
