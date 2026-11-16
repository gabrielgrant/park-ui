import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './icon.fixtures'

describe('Icon (styled, SSR)', () => {
  it('renders an svg with recipe, size and style-prop classes', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    const el = document.querySelector('[data-testid="icon"]')
    const classes = el?.getAttribute('class') ?? ''
    expect(el?.tagName.toLowerCase()).toBe('svg')
    expect(el?.getAttribute('viewBox')).toBe('0 0 24 24')
    expect(classes).toContain('icon--size_lg')
    expect(classes).toContain('c_red.9')
    expect(el?.querySelector('path')).toBeTruthy()
  })
})
