import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './drawer.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Drawer (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest defaultOpen />, {
      qwikLoader: true,
    })

    expect(getClasses(document, '[data-testid="trigger"]')).toContain('drawer__trigger')
    expect(getClasses(document, '[data-testid="backdrop"]')).toContain('drawer__backdrop')
    expect(getClasses(document, '[data-testid="positioner"]')).toContain('drawer__positioner')
    expect(getClasses(document, '[data-testid="content"]')).toContain('drawer__content')
    expect(getClasses(document, '[data-part="title"]')).toContain('drawer__title')
    expect(getClasses(document, '[data-part="description"]')).toContain('drawer__description')
    expect(getClasses(document, '[data-testid="header"]')).toContain('drawer__header')
    expect(getClasses(document, '[data-testid="body"]')).toContain('drawer__body')
    expect(getClasses(document, '[data-testid="footer"]')).toContain('drawer__footer')
    expect(getClasses(document, '[data-testid="close"]')).toContain('drawer__closeTrigger')
  })

  it('applies default and changed variant classes', async () => {
    const defaults = await ssrRenderToDom(<ComponentUnderTest defaultOpen />, { qwikLoader: true })
    expect(getClasses(defaults.document, '[data-testid="content"]')).toContain(
      'drawer__content--placement_end',
    )
    expect(getClasses(defaults.document, '[data-testid="content"]')).toContain(
      'drawer__content--size_sm',
    )

    const changed = await ssrRenderToDom(
      <ComponentUnderTest defaultOpen placement="bottom" size="lg" />,
      {
        qwikLoader: true,
      },
    )
    expect(getClasses(changed.document, '[data-testid="content"]')).toContain(
      'drawer__content--placement_bottom',
    )
    expect(getClasses(changed.document, '[data-testid="content"]')).toContain(
      'drawer__content--size_lg',
    )
  })

  it('lazy-mounts content by default', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(document.querySelector('[data-testid="content"]')).toBeFalsy()
  })
})
