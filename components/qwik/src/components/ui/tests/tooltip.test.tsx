import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { Button } from '../button'
import { Tooltip } from '../tooltip'
import { ComponentUnderTest } from './tooltip.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Tooltip (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest defaultOpen />, {
      qwikLoader: true,
    })

    expect(getClasses(document, '[data-testid="trigger"]')).toContain('tooltip__trigger')
    expect(getClasses(document, '[data-part="positioner"]')).toContain('tooltip__positioner')
    expect(getClasses(document, '[data-testid="content"]')).toContain('tooltip__content')
    expect(getClasses(document, '[data-part="arrow"]')).toContain('tooltip__arrow')
    expect(getClasses(document, '[data-part="arrow-tip"]')).toContain('tooltip__arrowTip')
    expect(document.querySelector('[data-testid="content"]')?.textContent).toBe('Tooltip content')
  })

  it('renders children inside the trigger and merges triggerProps', async () => {
    const { document } = await ssrRenderToDom(
      <ComponentUnderTest triggerProps={{ 'data-testid': 'trigger', class: 'custom-trigger' }} />,
      { qwikLoader: true },
    )

    const trigger = document.querySelector('[data-testid="trigger"]')
    expect(trigger?.textContent).toBe('Hover me')
    expect(trigger?.getAttribute('class')?.split(/\s+/)).toEqual(
      expect.arrayContaining(['tooltip__trigger', 'custom-trigger']),
    )
  })

  it('omits the arrow unless showArrow is set', async () => {
    const { document } = await ssrRenderToDom(
      <ComponentUnderTest defaultOpen showArrow={false} />,
      {
        qwikLoader: true,
      },
    )

    expect(document.querySelector('[data-part="arrow"]')).toBeFalsy()
  })

  it('lazy-mounts content by default', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(document.querySelector('[data-testid="trigger"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="content"]')).toBeFalsy()
  })

  it('renders only the children when disabled', async () => {
    const { document } = await ssrRenderToDom(
      <Tooltip content="Tooltip content" disabled>
        <Button>Hover me</Button>
      </Tooltip>,
      { qwikLoader: true },
    )

    expect(document.querySelector('[data-part="trigger"]')).toBeFalsy()
    expect(document.querySelector('button')?.textContent).toBe('Hover me')
  })
})
