import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest, StartOnlyInputGroup } from './input-group.fixtures'

const getClasses = (element: Element | null | undefined) =>
  (element?.getAttribute('class') ?? '').split(/\s+/)

describe('InputGroup (styled, SSR)', () => {
  it('applies root and element slot classes', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const root = document.querySelector('[data-testid="group"]')
    expect(getClasses(root)).toContain('input-group__root')
    expect(getClasses(root)).toContain('input-group__root--size_md')
    const elements = root?.querySelectorAll('.input-group__element') ?? []
    expect(elements.length).toBe(2)
  })

  it('places start and end elements around the input', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const root = document.querySelector('[data-testid="group"]')
    const children = Array.from(root?.childNodes ?? []).filter(
      (node): node is Element => node.nodeType === 1,
    )
    expect(children.length).toBe(3)
    expect(children[0]?.querySelector('[data-testid="start-icon"]')).toBeTruthy()
    expect(getClasses(children[0])).toContain('inset-s_0')
    expect(children[1]?.getAttribute('data-testid')).toBe('input')
    expect(children[2]?.querySelector('[data-testid="end-icon"]')).toBeTruthy()
    expect(getClasses(children[2])).toContain('inset-e_0')
  })

  it('omits missing elements', async () => {
    const { document } = await ssrRenderToDom(<StartOnlyInputGroup />, { qwikLoader: true })

    expect(document.querySelectorAll('.input-group__element').length).toBe(1)
  })

  it('changes classes with the size variant', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest size="xl" />, {
      qwikLoader: true,
    })

    expect(getClasses(document.querySelector('[data-testid="group"]'))).toContain(
      'input-group__root--size_xl',
    )
    expect(getClasses(document.querySelector('.input-group__element'))).toContain(
      'input-group__element--size_xl',
    )
  })
})
