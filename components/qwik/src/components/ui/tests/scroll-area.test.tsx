import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './scroll-area.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('ScrollArea (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-testid="root"]')).toContain('scroll-area__root')
    expect(getClasses(document, '[data-testid="viewport"]')).toContain('scroll-area__viewport')
    expect(getClasses(document, '[data-testid="content"]')).toContain('scroll-area__content')
    expect(getClasses(document, '[data-testid="scrollbar"]')).toContain('scroll-area__scrollbar')
    expect(getClasses(document, '[data-testid="corner"]')).toContain('scroll-area__corner')
  })

  it('renders a default Thumb inside Scrollbar', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const thumb = document.querySelector('[data-testid="scrollbar"] > [data-part="thumb"]')
    expect(thumb?.getAttribute('class')?.split(/\s+/)).toContain('scroll-area__thumb')
  })

  it('applies default and changed variant classes', async () => {
    const defaults = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    expect(getClasses(defaults.document, '[data-testid="root"]')).toContain(
      'scroll-area__root--size_md',
    )
    expect(getClasses(defaults.document, '[data-testid="scrollbar"]')).toContain(
      'scroll-area__scrollbar--scrollbar_auto',
    )

    const changed = await ssrRenderToDom(<ComponentUnderTest size="lg" scrollbar="visible" />, {
      qwikLoader: true,
    })
    expect(getClasses(changed.document, '[data-testid="root"]')).toContain(
      'scroll-area__root--size_lg',
    )
    expect(getClasses(changed.document, '[data-testid="scrollbar"]')).toContain(
      'scroll-area__scrollbar--scrollbar_visible',
    )
  })
})
