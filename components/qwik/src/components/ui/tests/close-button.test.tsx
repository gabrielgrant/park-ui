import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest, CustomIconCloseButton } from './close-button.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('CloseButton (styled, SSR)', () => {
  it('defaults to a plain gray icon button labelled Close', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const button = document.querySelector('[data-testid="close"]')
    const classes = getClasses(document, '[data-testid="close"]')
    expect(button?.tagName).toBe('BUTTON')
    expect(button?.getAttribute('aria-label')).toBe('Close')
    expect(classes).toContain('button--variant_plain')
    expect(classes).toContain('color-palette_gray')
    expect(classes).toContain('px_0')
  })

  it('renders the X icon by default', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const paths = [...document.querySelectorAll('[data-testid="close"] svg path')].map((p) =>
      p.getAttribute('d'),
    )
    expect(paths).toEqual(['M18 6 6 18', 'm6 6 12 12'])
  })

  it('replaces the icon and defaults with user props', async () => {
    const { document } = await ssrRenderToDom(<CustomIconCloseButton />, { qwikLoader: true })

    const button = document.querySelector('[data-testid="close"]')
    expect(button?.getAttribute('aria-label')).toBe('Dismiss')
    expect(getClasses(document, '[data-testid="close"]')).toContain('button--variant_outline')
    expect(document.querySelectorAll('[data-testid="close"] svg').length).toBe(1)
    expect(document.querySelector('[data-testid="custom-icon"]')).toBeTruthy()
  })
})
