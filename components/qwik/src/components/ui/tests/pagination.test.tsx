import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './pagination.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Pagination (styled, SSR)', () => {
  it('applies recipe slot classes to the parts', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-scope="pagination"][data-part="root"]')).toContain(
      'pagination__root',
    )
    expect(getClasses(document, '[data-testid="prev-trigger"]')).toContain(
      'pagination__prevTrigger',
    )
    expect(getClasses(document, '[data-testid="next-trigger"]')).toContain(
      'pagination__nextTrigger',
    )
    expect(getClasses(document, '[data-part="ellipsis"]')).toContain('pagination__ellipsis')
  })

  it('renders page items as icon buttons with the selected page solid', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const items = [...document.querySelectorAll('[data-part="item"]')]
    expect(items.map((item) => item.textContent)).toEqual(['1', '2', '3', '4', '5', '10'])

    const current = document.querySelector('[data-part="item"][aria-current="page"]')
    expect(current?.textContent).toBe('1')
    expect(current?.getAttribute('class')).toContain('button--variant_solid')
    expect(current?.getAttribute('class')).toContain('button--size_sm')
    expect(items[1]?.getAttribute('class')).toContain('button--variant_outline')
  })

  it('renders the default ellipsis icon', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(document.querySelector('[data-part="ellipsis"] span svg')).toBeTruthy()
  })
})
