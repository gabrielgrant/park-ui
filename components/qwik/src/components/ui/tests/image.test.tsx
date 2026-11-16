import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest, ImageCustom } from './image.fixtures'

describe('Image (styled, SSR)', () => {
  it('defaults object-fit to cover', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    const el = document.querySelector('[data-testid="img"]')
    expect(el?.tagName).toBe('IMG')
    expect(el?.getAttribute('src')).toBe('/a.png')
    expect(el?.getAttribute('alt')).toBe('A')
    expect(el?.getAttribute('class')).toContain('obj-f_cover')
  })

  it('maps fit and alignment to object-fit and object-position', async () => {
    const { document } = await ssrRenderToDom(<ImageCustom />, { qwikLoader: true })
    const el = document.querySelector('[data-testid="img-custom"]')
    const classes = el?.getAttribute('class') ?? ''
    expect(classes).toContain('obj-f_contain')
    expect(classes).toContain('obj-p_top')
    expect(classes).not.toContain('obj-f_cover')
    expect(el?.hasAttribute('fit')).toBe(false)
    expect(el?.hasAttribute('alignment')).toBe(false)
  })
})
