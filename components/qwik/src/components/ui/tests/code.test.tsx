import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './code.fixtures'

describe('Code (styled, SSR)', () => {
  it('renders a code element with recipe and variant classes', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    const el = document.querySelector('[data-testid="code"]')
    const classes = el?.getAttribute('class') ?? ''
    expect(el?.tagName).toBe('CODE')
    expect(classes).toContain('code--variant_outline')
    expect(classes).toContain('code--size_lg')
    expect(el?.textContent).toBe('console.log()')
  })
})
