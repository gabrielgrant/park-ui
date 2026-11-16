import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './dialog.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Dialog (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest defaultOpen />, {
      qwikLoader: true,
    })

    expect(getClasses(document, '[data-testid="trigger"]')).toContain('dialog__trigger')
    expect(getClasses(document, '[data-testid="backdrop"]')).toContain('dialog__backdrop')
    expect(getClasses(document, '[data-testid="positioner"]')).toContain('dialog__positioner')
    expect(getClasses(document, '[data-testid="content"]')).toContain('dialog__content')
    expect(getClasses(document, '[data-part="title"]')).toContain('dialog__title')
    expect(getClasses(document, '[data-part="description"]')).toContain('dialog__description')
    expect(getClasses(document, '[data-testid="header"]')).toContain('dialog__header')
    expect(getClasses(document, '[data-testid="body"]')).toContain('dialog__body')
    expect(getClasses(document, '[data-testid="footer"]')).toContain('dialog__footer')
    expect(getClasses(document, '[data-testid="close"]')).toContain('dialog__closeTrigger')
  })

  it('applies default and changed variant classes', async () => {
    const defaults = await ssrRenderToDom(<ComponentUnderTest defaultOpen />, { qwikLoader: true })
    expect(getClasses(defaults.document, '[data-testid="content"]')).toContain(
      'dialog__content--size_md',
    )
    expect(getClasses(defaults.document, '[data-testid="content"]')).toContain(
      'dialog__content--placement_center',
    )

    const sized = await ssrRenderToDom(
      <ComponentUnderTest defaultOpen size="lg" placement="top" />,
      {
        qwikLoader: true,
      },
    )
    expect(getClasses(sized.document, '[data-testid="content"]')).toContain(
      'dialog__content--size_lg',
    )
    expect(getClasses(sized.document, '[data-testid="positioner"]')).toContain(
      'dialog__positioner--placement_top',
    )
  })

  it('lazy-mounts content by default', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(document.querySelector('[data-testid="trigger"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="content"]')).toBeFalsy()
  })

  it('renders ActionTrigger as a plain button', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest defaultOpen />, {
      qwikLoader: true,
    })

    const action = document.querySelector('[data-testid="action"]')
    expect(action?.tagName).toBe('BUTTON')
    expect(action?.getAttribute('type')).toBe('button')
  })
})
