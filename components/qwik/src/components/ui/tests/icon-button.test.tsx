import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest, SizedIconButton } from './icon-button.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('IconButton (styled, SSR)', () => {
  it('renders a button with the button recipe and zero padding', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const classes = getClasses(document, '[data-testid="icon-button"]')
    expect(document.querySelector('[data-testid="icon-button"]')?.tagName).toBe('BUTTON')
    expect(classes).toContain('button')
    expect(classes).toContain('button--variant_solid')
    expect(classes).toContain('px_0')
    expect(classes).toContain('py_0')
  })

  it('changes classes with variant props', async () => {
    const { document } = await ssrRenderToDom(<SizedIconButton />, { qwikLoader: true })

    const classes = getClasses(document, '[data-testid="icon-button"]')
    expect(classes).toContain('button--variant_outline')
    expect(classes).toContain('button--size_lg')
  })

  it('projects the icon child', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(document.querySelector('[data-testid="icon-button"] svg')).toBeTruthy()
    expect(document.querySelector('[data-testid="icon-button"]')?.getAttribute('aria-label')).toBe(
      'Favorite',
    )
  })
})
