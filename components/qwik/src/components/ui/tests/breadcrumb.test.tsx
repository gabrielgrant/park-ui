import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './breadcrumb.fixtures'

describe('Breadcrumb (styled, SSR)', () => {
  it('renders nav/ol/li/a with slot classes', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    const parts: Record<string, string> = {
      root: 'NAV',
      list: 'OL',
      item: 'LI',
      link: 'A',
      separator: 'LI',
      ellipsis: 'LI',
    }
    for (const [slot, tag] of Object.entries(parts)) {
      const el = document.querySelector(`[data-testid="${slot}"]`)
      expect(el?.tagName).toBe(tag)
      expect(el?.getAttribute('class')).toContain(`breadcrumb__${slot}`)
    }
    const root = document.querySelector('[data-testid="root"]')
    expect(root?.getAttribute('class')).toContain('breadcrumb__root--variant_underline')
    expect(root?.getAttribute('class')).toContain('breadcrumb__root--size_sm')
  })

  it('applies default props', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    expect(document.querySelector('[data-testid="root"]')?.getAttribute('aria-label')).toBe(
      'breadcrumb',
    )

    const ellipsis = document.querySelector('[data-testid="ellipsis"]')
    expect(ellipsis?.getAttribute('role')).toBe('presentation')
    expect(ellipsis?.getAttribute('aria-hidden')).toBe('true')
    expect(ellipsis?.textContent).toBe('...')

    const separator = document.querySelector('[data-testid="separator"]')
    expect(separator?.getAttribute('aria-hidden')).toBe('true')
    expect(separator?.querySelector('svg')).toBeTruthy()
  })

  it('renders custom separator children instead of the chevron', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    const separator = document.querySelector('[data-testid="custom-separator"]')
    expect(separator?.textContent).toBe('/')
    expect(separator?.querySelector('svg')).toBeFalsy()
  })
})
