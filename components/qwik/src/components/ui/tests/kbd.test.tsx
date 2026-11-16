import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './kbd.fixtures'

describe('Kbd (styled, SSR)', () => {
  it('renders a kbd element with recipe and variant classes', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    const el = document.querySelector('[data-testid="kbd"]')
    const classes = el?.getAttribute('class') ?? ''
    expect(el?.tagName).toBe('KBD')
    expect(classes).toContain('kbd--variant_subtle')
    expect(classes).toContain('kbd--size_sm')
  })
})
