import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { Badge } from '../badge'
import { ComponentUnderTest } from './badge.fixtures'

describe('Badge (styled, SSR)', () => {
  it('applies recipe and variant classes', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    const el = document.querySelector('[data-testid="badge"]')
    const classes = el?.getAttribute('class') ?? ''
    expect(el?.tagName).toBe('DIV')
    expect(classes).toContain('badge')
    expect(classes).toContain('badge--variant_solid')
    expect(classes).toContain('badge--size_lg')
    expect(el?.querySelector('svg')).toBeTruthy()
    expect(el?.textContent).toContain('New')
  })

  it('uses default variants', async () => {
    const { document } = await ssrRenderToDom(<Badge data-testid="b">Default</Badge>, {
      qwikLoader: true,
    })
    const classes = document.querySelector('[data-testid="b"]')?.getAttribute('class') ?? ''
    expect(classes).toMatch(/badge--variant_\w+/)
    expect(classes).toMatch(/badge--size_\w+/)
  })
})
