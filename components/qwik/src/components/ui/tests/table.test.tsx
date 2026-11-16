import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './table.fixtures'

describe('Table (styled, SSR)', () => {
  it('renders table elements with slot classes', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    const parts: Record<string, string> = {
      root: 'TABLE',
      caption: 'CAPTION',
      head: 'THEAD',
      row: 'TR',
      header: 'TH',
      body: 'TBODY',
      cell: 'TD',
      foot: 'TFOOT',
    }
    for (const [slot, tag] of Object.entries(parts)) {
      const el = document.querySelector(`[data-testid="${slot}"]`)
      expect(el?.tagName).toBe(tag)
      expect(el?.getAttribute('class')).toContain(`table__${slot}`)
    }
  })

  it('applies boolean and size variants', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    const root = document.querySelector('[data-testid="root"]')?.getAttribute('class') ?? ''
    expect(root).toContain('table__root--striped_true')
    expect(root).toContain('table__root--interactive_true')
    expect(root).toContain('table__root--variant_surface')
  })
})
